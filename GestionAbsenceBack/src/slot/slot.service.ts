import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, slot } from '@prisma/client';
import { CreateSlotBySessionDto } from './dto/ceate-slot.dto';

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

  async postBySessionName(data: CreateSlotBySessionDto) {
    const { groupId, courseName, sessionType, date } = data
    const tempSessionType = await this.prisma.session_type.findFirst({
      where: {
        course_type_name: sessionType,
        session_type_course_material: {
          name: courseName,
        },
      },
      include: { session_type_course_material: true }
    })
    if (!tempSessionType) {
      throw new Error('Type de session avec ce nom de matière introuvable');
    }
    return this.prisma.slot.create({
      data: {
        date: new Date(`${date}T08:00:00`),
        slot_group: {
          connect: { id: groupId }
        },
        slot_session_type: {
          connect: { id: tempSessionType.id },
        },
      },
    })
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

  async deleteMany() {
    return this.prisma.slot.deleteMany()
  }
}