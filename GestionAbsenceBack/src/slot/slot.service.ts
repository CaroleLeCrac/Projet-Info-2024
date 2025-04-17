import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, slot } from '@prisma/client';

@Injectable()
export class SlotService {
  constructor(private prisma: PrismaService) { }

  async get(id: Prisma.slotWhereUniqueInput): Promise<slot | null> {
    return this.prisma.slot.findUnique({
      where: id,
    });
  }

  async getAll(): Promise<slot[]> {
    return this.prisma.slot.findMany();
  }

  async post(data: Prisma.slotCreateInput): Promise<slot> {
    return this.prisma.slot.create({
      data,
    });
  }

  async put(id: number, data: Prisma.slotUpdateInput): Promise<slot | null> {
    return this.prisma.slot.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: Prisma.slotWhereUniqueInput): Promise<slot> {
    return this.prisma.slot.delete({
      where: id,
    });
  }
}