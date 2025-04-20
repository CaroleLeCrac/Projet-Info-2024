import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, inscription } from '@prisma/client';

@Injectable()
export class InscriptionService {
  constructor(private prisma: PrismaService) { }

    async get(id: Prisma.inscriptionWhereUniqueInput): Promise<inscription | null> {
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


    async delete(id: Prisma.inscriptionWhereUniqueInput): Promise<inscription> {
        return this.prisma.inscription.delete({
          where: id,
        });
      }
}
