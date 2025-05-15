import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, student } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async get(id: Prisma.studentWhereUniqueInput): Promise<student | null> {
    return this.prisma.student.findUnique({
      where: id,
    });
  }

  async getByGroup(groupId: number) {
    return this.prisma.student.findMany({
      where: {
        student_inscription: {
          some: {
            group_id: groupId,
          },
        },
      },
    });
  }

  async getByOtherGroups(groupId: number) {
    const baseGroup = await this.prisma.group.findUnique({
      where: { id: groupId },
      include: { group_semester: true },
    });
    if (!baseGroup) {
      throw new Error('Groupe non trouvé');
    }
    const otherGroups = await this.prisma.group.findMany({
      where: {
        semester_id: baseGroup.group_semester.id,
        name: {
          not: baseGroup.name,
        },
      },
    });
    const similarGroupsIds = otherGroups
      .filter((group) => this.isOneCharDifferent(baseGroup.name, group.name))
      .map((group) => group.id);

    let studentsInGroups: any[] = [];
    if (similarGroupsIds.length > 0) {
      studentsInGroups = await this.prisma.inscription.findMany({
        where: {
          group_id: { in: similarGroupsIds },
        },
        include: {
          inscription_student: true,
          inscription_group: true,
        },
      });
    } else {
      const baseGorupStudents = await this.prisma.inscription.findMany({
        where: { group_id: baseGroup.id },
        include: {
          inscription_student: true,
        },
      });
      const baseGroupStudentIds = baseGorupStudents.map(
        (inscription) => inscription.inscription_student.id,
      );
      const semesterStudents = await this.prisma.inscription.findMany({
        where: {
          group_id: { not: baseGroup.id },
          inscription_group: {
            semester_id: baseGroup.group_semester.id,
          },
        },
        include: {
          inscription_student: true,
        },
      });
      const filteredStudents = semesterStudents.filter((inscription) => {
        return !baseGroupStudentIds.includes(
          inscription.inscription_student.id,
        );
      });

      const uniqueStudentMap = new Map();
      for (const inscription of filteredStudents) {
        uniqueStudentMap.set(
          inscription.inscription_student.id,
          inscription.inscription_student,
        );
      }
      studentsInGroups = Array.from(uniqueStudentMap.values());
    }
    return studentsInGroups;
  }

  //Function pour trouvé les groupe avec des noms similaire (TD1, TD2, TD3)
  private isOneCharDifferent(s1: string, s2: string) {
    if (s1.length === s2.length) {
      let diff = 0;
      let i: number;
      for (i = 0; i < s1.length; i++) {
        if (s1[i] !== s2[i]) {
          diff++;
        }
        if (diff > 1) {
          return false;
        }
      }
      return diff === 1;
    }
  }

  async getByCourseMaterial(courseMaterialId: number) {
    const courseMaterialSemester = await this.prisma.course_material.findUnique(
      {
        where: {
          id: courseMaterialId,
        },
      },
    );
    const groups = await this.prisma.group.findMany({
      where: {
        semester_id: courseMaterialSemester?.semester_id,
      },
    });
    const groupIds = groups.map((group) => group.id);
    const inscriptions = await this.prisma.inscription.findMany({
      where: {
        group_id: { in: groupIds },
      },
    });
    const inscriptionStudentIds = Array.from(
      new Set(inscriptions.map((inscription) => inscription.student_id)),
    );
    const students = await this.prisma.student.findMany({
      where: {
        id: {
          in: inscriptionStudentIds,
        },
      },
    });
    return students;
  }

  async getByCourseWithPresence(courseId: number) {
    const absences = await this.prisma.presence.findMany({
      where: {
        presence_slot: {
          slot_session_type: {
            course_material_id: courseId,
          },
        },
      },
      include: {
        presence_student: true,
        presence_slot: true,
      },
    });
    return absences.map((presence) => ({
      student: presence.presence_student,
      date: presence.presence_slot.date,
    }));
  }

  async getAll(): Promise<student[]> {
    return this.prisma.student.findMany();
  }

  async findByStudentNumber(student_num: string[]): Promise<student[]> {
    return this.prisma.student.findMany({
      where: {
        student_number: {
          in: student_num,
        },
      },
    });
  }

  async post(data: Prisma.studentCreateInput): Promise<student> {
    return this.prisma.student.create({
      data,
    });
  }

  async put(
    id: number,
    data: Prisma.studentUpdateInput,
  ): Promise<student | null> {
    return this.prisma.student.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: Prisma.studentWhereUniqueInput): Promise<student> {
    return this.prisma.student.delete({
      where: id,
    });
  }

  async deleteMany() {
    return this.prisma.student.deleteMany();
  }
}
