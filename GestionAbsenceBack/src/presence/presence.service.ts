import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, presence } from '@prisma/client';

@Injectable()
export class PresenceService {
  constructor(private prisma: PrismaService) { }

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

  async delete(id: Prisma.presenceWhereUniqueInput): Promise<presence> {
    return this.prisma.presence.delete({
      where: id,
    });
  }
}
