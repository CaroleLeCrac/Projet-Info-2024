import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, semester } from '@prisma/client';


@Injectable()
export class SemesterService {
  constructor(private prisma: PrismaService) {}

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
    })
  }

  async put(id: number, data:Prisma.semesterUpdateInput): Promise<semester | null>{
    return this.prisma.semester.update({
      where: {id},
      data: data,
    });
  }

  async delete(id : Prisma.semesterWhereUniqueInput): Promise<semester> {
    return this.prisma.semester.delete({
      where : id,
    });
  }

}