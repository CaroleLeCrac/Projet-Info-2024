import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, session_type } from '@prisma/client';

@Injectable()
export class SessionTypeService {
  session_type: any;
  constructor(private prisma: PrismaService) {}

  async get(
    id: Prisma.session_typeWhereUniqueInput,
  ): Promise<session_type | null> {
    return this.prisma.session_type.findUnique({
      where: id,
    });
  }

  async getAll(): Promise<session_type[]> {
    return this.prisma.session_type.findMany();
  }

  async post(data: Prisma.session_typeCreateInput): Promise<session_type> {
    return this.prisma.session_type.create({
      data,
    });
  }

  async put(
    id: number,
    data: Prisma.session_typeUpdateInput,
  ): Promise<session_type | null> {
    return this.prisma.session_type.update({
      where: { id },
      data: data,
    });
  }

  // Supprimer tous les types de session
  async deleteAll() {
    return this.prisma.session_type.deleteMany();
  }

  async delete(id: Prisma.session_typeWhereUniqueInput): Promise<session_type> {
    return this.prisma.session_type.delete({
      where: id,
    });
  }

  async postSession_Type(
    sessionTypes: { course_type_name: string; course_material_id: number }[],
  ) {
    const createdSessionTypes = await Promise.all(
      sessionTypes.map(async (sessionType) => {
        // Vérification préalable de la validité du courseMaterialId
        if (!sessionType.course_material_id) {
          console.log(
            `ID de la matière de cours invalide pour le type de session: ${sessionType.course_type_name}. Ignoré.`,
          );
          return null;
        }

        // Recherche de la matière de cours par ID
        const courseMaterial = await this.prisma.course_material.findUnique({
          where: { id: sessionType.course_material_id },
        });

        // Si la matière de cours n'existe pas, on ignore cette entrée et ne pas créer de sessionType
        if (!courseMaterial) {
          console.error(
            `Matière de cours avec l'ID '${sessionType.course_material_id}' non trouvée. Type de session ignoré.`,
          );
          return null; // Ignorer cette entrée
        }

        // Si courseMaterial existe, créer le sessionType
        return this.prisma.session_type.create({
          data: {
            course_type_name: sessionType.course_type_name,
            course_material_id: sessionType.course_material_id,
          },
        });
      }),
    );

    // Filtrer les résultats pour ne garder que les objets valides (ceux qui ne sont pas null)
    return createdSessionTypes.filter((sessionType) => sessionType !== null);
  }
}
