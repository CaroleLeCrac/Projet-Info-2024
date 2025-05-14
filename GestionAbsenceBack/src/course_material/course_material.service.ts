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

    async getByStudentWithPresence(studentId : number) {
      const absences = await this.prisma.presence.findMany({
        where : {
          presence_student : {
              id : studentId,
          },
        },
        include : {
          presence_student : true,
          presence_slot : {
            include : {
              slot_session_type : {
                include : {
                  session_type_course_material : true,
                },
              },
            },
          },
        },
      })
      return absences.map(presence => ({
        student : presence.presence_student,
        date : presence.presence_slot.date,
        courseType : presence.presence_slot.slot_session_type.course_type_name,
        courseName : presence.presence_slot.slot_session_type.session_type_course_material.name,
        courseId : presence.presence_slot.slot_session_type.session_type_course_material.id

      }))
    }

    async getByStudent(studentId : number){
      const semesterId = await this.prisma.inscription.findFirst({
        where : {
          student_id : studentId,
        },
        include : {
          inscription_group : {
            select : {
              semester_id : true,
            },
          },
        },
      })
      const courseMaterials = await this.prisma.course_material.findMany({
        where : {
          semester_id : semesterId?.inscription_group.semester_id,
        }
      })
      return courseMaterials
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