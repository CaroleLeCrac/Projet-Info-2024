import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StudentService } from 'src/student/student.service';
import { Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class CsvService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly studentService: StudentService,
  ) {}

  async parseCsvAddStudents(fileBuffer: Buffer): Promise<any[]> {
    const students: { student_number: string; name: string }[] = [];
    const bufferStream = new Readable();
    bufferStream.push(fileBuffer);
    bufferStream.push(null);

    return new Promise((resolve, reject) => {
      bufferStream
        .pipe(csv())
        .on('data', (row) => {
          const student_number = row[Object.keys(row)[0]]?.trim();
          const last_name = row[Object.keys(row)[1]]?.trim();
          const first_name = row[Object.keys(row)[2]]?.trim();

          if (student_number && last_name && first_name) {
            const name = `${last_name} ${first_name}`;
            students.push({ student_number, name });
          }
        })
        .on('end', async () => {
          try {
            await this.prisma.student.createMany({ data: students });
            resolve(students);
          } catch (error) {
            reject(`Erreur dans l'insertion : ${error.message}`);
          }
        })
        .on('error', (err) => reject(err));
    });
  }

  async parseCsvAddInscription(
    groupId: number,
    fileBuffer: Buffer,
  ): Promise<any[]> {
    const studentsNumber: string[] = [];
    const bufferStream = new Readable();
    bufferStream.push(fileBuffer);
    bufferStream.push(null);

    return new Promise((resolve, reject) => {
      bufferStream
        .pipe(csv())
        .on('data', (row) => {
          const student_number = row[Object.keys(row)[0]]?.trim();
          if (student_number) {
            studentsNumber.push(student_number);
          }
        })
        .on('end', async () => {
          try {
            const students =
              await this.studentService.findByStudentNumber(studentsNumber);
            const foundNumbers = students.map((s) => s.student_number);
            const inscriptions = students.map((student) => ({
              student_id: student.id,
              group_id: groupId,
            }));
            await this.prisma.inscription.createMany({ data: inscriptions });
            resolve(inscriptions);
          } catch (error) {
            reject(`Erreur dans l'insertion : ${error.message}`);
          }
        })
        .on('error', (err) => reject(err));
    });
  }
}
