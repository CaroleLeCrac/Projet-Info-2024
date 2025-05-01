import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CourseMaterialService } from './course_material.service';
import { CreateCourseMaterialDto } from './dto/create-course_material.dto';
import { UpdateCourseMaterialDto } from './dto/update-course_material.dto';
@Controller('course_material')
export class CourseMaterialController {
  constructor(private readonly courseMaterialService: CourseMaterialService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
      return this.courseMaterialService.get({id});
  }

  @Get('presence/student/:studentId')
  async getByStudentIdWithPresence(@Param('studentId', ParseIntPipe) studentId : number){
    return this.courseMaterialService.getByStudentWithPresence(studentId)
  }

  @Get()
  getAll() {
      return this.courseMaterialService.getAll();
  }

  @Post()
  async put(@Body() createCourseMaterialDto : CreateCourseMaterialDto) {
      const {semester_id, name} = createCourseMaterialDto
      const data : Prisma.course_materialCreateInput = {
          course_material_semester : {
              connect: {id : semester_id}
          },
          name, 
      }
      return this.courseMaterialService.post(data);
  }

  @Put(':id')
  async putById(@Param('id', ParseIntPipe) id : number, @Body() updateCourseMaterialDto : UpdateCourseMaterialDto ) {
      const {semester_id, name} = updateCourseMaterialDto
      const data : Prisma.course_materialUpdateInput = {
          course_material_semester : { connect: { id : semester_id}},
          name
      }
      return this.courseMaterialService.put(id, data)
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id : number){
      return this.courseMaterialService.delete(id)
  }

}