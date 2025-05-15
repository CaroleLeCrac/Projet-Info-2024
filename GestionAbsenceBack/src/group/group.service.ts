import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, group } from '@prisma/client';
import { CreateGroupBySemesterNameDto } from './dto/create-group-semester-name.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async get(id: Prisma.groupWhereUniqueInput): Promise<group | null> {
    return this.prisma.group.findUnique({
      where: id,
    });
  }

  async getBySemester() {
    const semesterNames = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];
    const semesterGroups = await this.prisma.semester.findMany({
      where: {
        name: {
          in: semesterNames,
        },
      },
      include: {
        semester_group: true,
      },
    });
    return semesterGroups.flatMap((semester) => semester.semester_group);
  }

  async getByStudentId(studentId: number) {
    return await this.prisma.inscription.findMany({
      where: {
        student_id: studentId,
      },
      include: {
        inscription_group: true,
      },
    });
  }

  async getByYear(year: number): Promise<group[]> {
    const semesterNames = [`S${(year - 1) * 2 + 1}`, `S${(year - 1) * 2 + 2}`];
    const semesters = await this.prisma.semester.findMany({
      where: {
        name: {
          in: semesterNames,
        },
      },
      include: {
        semester_group: true,
      },
    });
    return semesters.flatMap((semester) => semester.semester_group);
  }

  async getAll(): Promise<group[]> {
    return this.prisma.group.findMany();
  }

  async post(data: Prisma.groupCreateInput): Promise<group> {
    return this.prisma.group.create({
      data,
    });
  }

  async createFromSemesterName(
    createGroupBySemesterNameDto: CreateGroupBySemesterNameDto,
  ) {
    const { semester_name, name } = createGroupBySemesterNameDto;
    const semester = await this.prisma.semester.findFirst({
      where: { name: semester_name },
    });
    if (!semester) {
      throw new NotFoundException(`Semester "${semester_name}" non trouvé`);
    }
    return this.prisma.group.create({
      data: {
        name: name,
        semester_id: semester.id,
      },
    });
  }

  async put(id: number, data: Prisma.groupUpdateInput): Promise<group | null> {
    return this.prisma.group.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: number): Promise<group | null> {
    return this.prisma.group.delete({
      where: { id },
    });
  }

  async deleteMany() {
    return this.prisma.group.deleteMany();
  }
}
