import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, presence } from '@prisma/client';

@Injectable()
export class PresenceService {
  constructor(private prisma: PrismaService) {}

  async getByYear(year: number) {
    const semesterNames = [`S${(year - 1) * 2 + 1}`, `S${(year - 1) * 2 + 2}`];
    const absences = await this.prisma.presence.findMany({
      where: {
        presence_student: {
          student_inscription: {
            some: {
              inscription_group: {
                group_semester: {
                  name: {
                    in: semesterNames,
                  },
                },
              },
            },
          },
        },
      },
      include: {
        presence_student: {
          select: {
            name: true,
            student_number: true,
          },
        },
        presence_slot: {
          select: {
            date: true,
            slot_session_type: {
              select: {
                course_type_name: true,
                session_type_course_material: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const simplified = absences.map((a) => ({
      name: a.presence_student.name,
      student_number: a.presence_student.student_number,
      date: a.presence_slot.date,
      session_type: a.presence_slot.slot_session_type.course_type_name,
      course_material:
        a.presence_slot.slot_session_type.session_type_course_material.name,
    }));
    return simplified;
  }

  async get(id: Prisma.presenceWhereUniqueInput): Promise<presence | null> {
    return this.prisma.presence.findUnique({
      where: id,
    });
  }

  async getAll(): Promise<presence[]> {
    return this.prisma.presence.findMany();
  }

  async post(data: Prisma.presenceCreateInput): Promise<presence> {
    return this.prisma.presence.create({
      data,
    });
  }

  async postMany(slotId: number, studentIds: number[]) {
    const data = studentIds.map((studentId) => ({
      student_id: studentId,
      slot_id: slotId,
    }));
    await this.prisma.presence.createMany({ data });
  }

  async delete(id: Prisma.presenceWhereUniqueInput): Promise<presence> {
    return this.prisma.presence.delete({
      where: id,
    });
  }

  async deleteMany() {
    return this.prisma.presence.deleteMany();
  }
}
