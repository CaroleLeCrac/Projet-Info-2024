import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, course_material } from '@prisma/client';

@Injectable()
export class CourseMaterialService {
  constructor(private prisma: PrismaService) {}

    async get(id: Prisma.course_materialWhereUniqueInput): Promise<course_material | null> {
      return this.prisma.course_material.findUnique({
        where: id,
      });
    }

    async getAll(): Promise<course_material[]> {
        return this.prisma.course_material.findMany();
    }

    async post(data: Prisma.course_materialCreateInput): Promise<course_material> {
        return this.prisma.course_material.create({
          data,
        });
      }
   
    async put(id : number, data: Prisma.course_materialUpdateInput) : Promise<course_material| null> {
      return this.prisma.course_material.update({
        where: { id },
        data: data,
      })
    }

    async delete(id : number) : Promise<course_material | null> {
      return this.prisma.course_material.delete({
        where : {id},
      })
    }

}