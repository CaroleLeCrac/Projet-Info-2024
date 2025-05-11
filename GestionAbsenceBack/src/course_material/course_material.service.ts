import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, course_material } from '@prisma/client';

@Injectable()
export class CourseMaterialService {
  constructor(private prisma: PrismaService) { }

  async get(id: Prisma.course_materialWhereUniqueInput): Promise<course_material | null> {
    return this.prisma.course_material.findUnique({
      where: id,
    });
  }

  async getByStudentWithPresence(studentId: number) {
    const absences = await this.prisma.presence.findMany({
      where: {
        presence_student: {
          id: studentId,
        },
      },
      include: {
        presence_student: true,
        presence_slot: {
          include: {
            slot_session_type: {
              include: {
                session_type_course_material: true,
              },
            },
          },
        },
      },
    })
    return absences.map(presence => ({
      student: presence.presence_student,
      date: presence.presence_slot.date,
      courseType: presence.presence_slot.slot_session_type.course_type_name,
      courseName: presence.presence_slot.slot_session_type.session_type_course_material.name
    }))
  }

  async getAll(): Promise<course_material[]> {
    return this.prisma.course_material.findMany();
  }

  async post(data: Prisma.course_materialCreateInput): Promise<course_material> {
    return this.prisma.course_material.create({
      data,
    });
  }

  async put(id: number, data: Prisma.course_materialUpdateInput): Promise<course_material | null> {
    return this.prisma.course_material.update({
      where: { id },
      data: data,
    })
  }

  async deleteAll() {
 await this.prisma.course_material.deleteMany();
}

  async delete(id: number): Promise<course_material | null> {
    return this.prisma.course_material.delete({
      where: { id },
    })
  }
  
async createADE(courseMaterials: { name: string, semestre: number }[]) {
  const createdMaterials = await Promise.all(
    courseMaterials.map(async (courseMaterial) => {
      // Vérification préalable de l'existence du semestre
      if (!courseMaterial.semestre) {
        // Si semestre est null ou undefined, on ignore cette matière
        console.log(`Semestre invalide pour la matière: ${courseMaterial.name}. Ignoré.`);
        return null;
      }

      // Recherche du semestre par son id
      const semester = await this.prisma.semester.findUnique({
        where: { id: courseMaterial.semestre },
      });

      // Si le semestre n'existe pas, on ignore cette matière
      if (!semester) {
        console.log(`Semestre avec l'ID ${courseMaterial.semestre} non trouvé. Matière ignorée.`);
        return null;
      }

      // Création de la matière de cours avec l'ID du semestre trouvé
      return this.prisma.course_material.create({
        data: {
          name: courseMaterial.name,
          semester_id: semester.id,
        },
      });
    })
  );

  // On filtre les matières invalides (celles dont la création a échoué à cause d'un semestre invalide)
  return createdMaterials.filter(material => material !== null);
}

}