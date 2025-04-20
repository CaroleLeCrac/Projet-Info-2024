import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, group } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

    async get(id: Prisma.groupWhereUniqueInput): Promise<group | null> {
      return this.prisma.group.findUnique({
        where: id,
      });
    }

    async getAll(): Promise<group[]> {
        return this.prisma.group.findMany();
    }

    async post(data: Prisma.groupCreateInput): Promise<group> {
        return this.prisma.group.create({
          data,
        });
      }
   
    async put(id : number, data: Prisma.groupUpdateInput) : Promise<group | null> {
      return this.prisma.group.update({
        where: { id },
        data: data,
      })
    }

    async delete(id : number) : Promise<group | null> {
      return this.prisma.group.delete({
        where : {id},
      })
    }
}