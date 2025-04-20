import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':id')
  async getById(@Param('id') id : number) {
    console.log(id)
    return this.studentService.get({ id });
  }

  @Get()
  getAll() {
    return this.studentService.getAll();
  }

  @Post()
  async put(@Body() createStudentDto : CreateStudentDto) {
    return this.studentService.post(createStudentDto)
  }

  @Put(':id')
  async putById(@Param('id') id : number, @Body() updateStudentDto : UpdateStudentDto ){
    return this.studentService.put( id , updateStudentDto)
  }

  @Delete(':id')
  async deleteById(@Param('id') id : number){
    return this.studentService.delete({id})
  }

}
