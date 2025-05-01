import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('presence/course/:courseId')
  async getBycourseIdWithPresence(@Param('courseId', ParseIntPipe) courseId : number, ){
    return this.studentService.getByCourseWithPresence(courseId)
  }

  @Get('by-group/:groupId')
  async getByGroupId(@Param('groupId', ParseIntPipe) groupId : number){
    return this.studentService.getByGroup(groupId)
  }

  @Get('same-other-group/:groupId')
  async getByOtherGroup(@Param('groupId', ParseIntPipe) groupId : number){
    return this.studentService.getByOtherGroups(groupId)
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id : number) {
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
  async putById(@Param('id', ParseIntPipe) id : number, @Body() updateStudentDto : UpdateStudentDto ){
    return this.studentService.put( id , updateStudentDto)
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id : number){
    return this.studentService.delete({id})
  }

  @Delete()
  async deleteMany(){
    return this.studentService.deleteMany()
  }

}
