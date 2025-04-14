import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, session_type } from '@prisma/client';

@Injectable()
export class SessionTypeService {
  constructor(private prisma: PrismaService) { }

  async get(id: Prisma.session_typeWhereUniqueInput): Promise<session_type | null> {
    return this.prisma.session_type.findUnique({
      where: id,
    });
  }

  async getAll(): Promise<session_type[]> {
    return this.prisma.session_type.findMany();
  }

  async post(data: Prisma.session_typeCreateInput): Promise<session_type> {
    return this.prisma.session_type.create({
      data,
    });
  }

  async put(id: number, data: Prisma.session_typeUpdateInput): Promise<session_type | null> {
    return this.prisma.session_type.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: Prisma.session_typeWhereUniqueInput): Promise<session_type> {
    return this.prisma.session_type.delete({
      where: id,
    });
  }
}
