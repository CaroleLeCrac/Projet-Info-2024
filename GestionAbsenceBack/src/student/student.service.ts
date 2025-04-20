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

  async getAll(): Promise<student[]> {
    return this.prisma.student.findMany();
  }

  async post(data: Prisma.studentCreateInput): Promise<student> {
    return this.prisma.student.create({
      data,
    })
  }

  async put(id: number, data:Prisma.studentUpdateInput): Promise<student | null>{
    return this.prisma.student.update({
      where: {id},
      data: data,
    });
  }

  async delete(id : Prisma.studentWhereUniqueInput): Promise<student> {
    return this.prisma.student.delete({
      where : id,
    });
  }
}