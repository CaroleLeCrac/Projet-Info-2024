import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';


@Controller('semester')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {} 

  @Get(':id')
  async getById(@Param('id') id : number) {
    return this.semesterService.get({ id });
  }

  @Get()
  getAll() {
    return this.semesterService.getAll();
  }

  @Post()
  async put(@Body() createSemesterDto : CreateSemesterDto) {
    return this.semesterService.post(createSemesterDto)
  }

  @Put(':id')
  async putById(@Param('id') id : number, @Body() updateSemesterDto : UpdateSemesterDto ){
    return this.semesterService.put( id , updateSemesterDto)
  }

  @Delete(':id')
  async deleteById(@Param('id') id : number){
    return this.semesterService.delete({id})
  }

}