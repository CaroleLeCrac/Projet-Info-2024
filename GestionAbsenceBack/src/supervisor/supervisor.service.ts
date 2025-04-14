import { Injectable } from '@nestjs/common';
import { supervisor } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SupervisorService {
  constructor(private prisma: PrismaService) { }

  // Trouver tous les superviseurs
  async getAll(): Promise<supervisor[]> {
    return this.prisma.supervisor.findMany();
  }

  // Trouver un superviseur par son ID
  async get(id: Prisma.supervisorWhereUniqueInput): Promise<supervisor | null> {
    return this.prisma.supervisor.findUnique({
      where: id,
    });
  }

  // Créer un nouveau superviseur
  async post(data: Prisma.supervisorCreateInput): Promise<supervisor> {
    return this.prisma.supervisor.create({
      data,
    })
  }

  // Mettre à jour un superviseur par son ID
  async put(id: number, data: Prisma.supervisorUpdateInput): Promise<supervisor | null> {
    return this.prisma.supervisor.update({
      where: { id },
      data: data,
    });
  }

  // Supprimer un superviseur par son ID
  async delete(id: Prisma.supervisorWhereUniqueInput): Promise<supervisor> {
    return this.prisma.supervisor.delete({
      where: id,
    });
  }
}
