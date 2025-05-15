import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, inscription } from '@prisma/client';
import { connect } from 'http2';

@Injectable()
export class InscriptionService {
  constructor(private prisma: PrismaService) {}

  async get(
    id: Prisma.inscriptionWhereUniqueInput,
  ): Promise<inscription | null> {
    return this.prisma.inscription.findUnique({
      where: id,
    });
  }
  async getAll(): Promise<inscription[]> {
    return this.prisma.inscription.findMany();
  }

  async post(data: Prisma.inscriptionCreateInput): Promise<inscription> {
    return this.prisma.inscription.create({
      data,
    });
  }

  async updateOneGroup(
    studentId: number,
    oldGroupId: number,
    newGroupId: number,
  ) {
    return this.prisma.$transaction([
      this.prisma.inscription.delete({
        where: {
          student_id_group_id: {
            student_id: studentId,
            group_id: oldGroupId,
          },
        },
      }),
      this.prisma.inscription.create({
        data: {
          inscription_student: {
            connect: { id: studentId },
          },
          inscription_group: {
            connect: { id: newGroupId },
          },
        },
      }),
    ]);
  }

  async putMany(studentId: number, groupIds: number[]) {
    const data = groupIds.map((groupId) => ({
      student_id: studentId,
      group_id: groupId,
    }));
    return this.prisma.$transaction([
      this.prisma.inscription.deleteMany({
        where: {
          student_id: studentId,
        },
      }),
      this.prisma.inscription.createMany({
        data,
      }),
    ]);
  }

  async delete(id: Prisma.inscriptionWhereUniqueInput): Promise<inscription> {
    return this.prisma.inscription.delete({
      where: id,
    });
  }

  async deleteMany() {
    return this.prisma.inscription.deleteMany();
  }
}
