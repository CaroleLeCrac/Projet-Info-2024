import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, semester } from '@prisma/client';

@Injectable()
export class SemesterService {
  constructor(private prisma: PrismaService) {}

  async postSemester(semesters: { name: string }[]) {
    const createdSemesters = await Promise.all(
      semesters.map(async (semester) => {
        // Vérification que le semestre n'est pas null ou vide
        if (!semester.name) {
          console.log('Semestre invalide, ignoré.');
          return null; // Ignore cette entrée si le semestre est invalide
        }

        // Tentative de création du semestre
        try {
          const createdSemester = await this.prisma.semester.create({
            data: {
              name: semester.name,
            },
          });
          return createdSemester;
        } catch (error) {
          console.error(
            `Erreur lors de la création du semestre: ${semester.name}`,
            error,
          );
          return null; // En cas d'erreur, ignorer cette entrée
        }
      }),
    );

    // Filtrer les semestres invalides (c'est-à-dire ceux qui ont échoué ou étaient invalides)
    return createdSemesters.filter((semester) => semester !== null);
  }

  // Supprimer tous les semestres
  async deleteAll() {
    return this.prisma.semester.deleteMany();
  }

  async get(id: Prisma.semesterWhereUniqueInput): Promise<semester | null> {
    return this.prisma.semester.findUnique({
      where: id,
    });
  }

  async getAll(): Promise<semester[]> {
    return this.prisma.semester.findMany();
  }

  async post(data: Prisma.semesterCreateInput): Promise<semester> {
    return this.prisma.semester.create({
      data,
    });
  }

  async put(
    id: number,
    data: Prisma.semesterUpdateInput,
  ): Promise<semester | null> {
    return this.prisma.semester.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: Prisma.semesterWhereUniqueInput): Promise<semester> {
    return this.prisma.semester.delete({
      where: id,
    });
  }
}
