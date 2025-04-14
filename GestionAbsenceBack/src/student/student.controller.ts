import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Prisma } from '@prisma/client';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Get(':id')
  async getById(@Param('id') id: number) {
    console.log(id)
    return this.studentService.get({ id: Number(id) });
  }

  @Get()
  getAll() {
    return this.studentService.getAll();
  }

  @Post()
  async post(@Body() createStudentDto: CreateStudentDto) {
    const data: Prisma.studentCreateInput = {
      id: Number(createStudentDto.id),
      name: createStudentDto.name,
      first_name: createStudentDto.first_name,
      mail: createStudentDto.mail,
    };
    return this.studentService.post(data);
  }

  @Put(':id')
  async putById(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto
  ) {
    const data: Prisma.studentUpdateInput = {
      name: updateStudentDto.name,
      first_name: updateStudentDto.first_name,
      mail: updateStudentDto.mail,
    };
    return this.studentService.put(Number(id), data);
  }


  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return this.studentService.delete({ id: Number(id) })
  }

}
