import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { SessionTypeService } from './session_type.service';
import { CreateSessionTypeDto } from './dto/create-session_type.dto';
import { UpdateSessionTypeDto } from './dto/update-session_type.dto';
import { Prisma } from '@prisma/client';

@Controller('session_type')
export class SessionTypeController {
  constructor(private readonly sessionTypeService: SessionTypeService) { }

  //recuperer par l'id les creneaux
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.sessionTypeService.get({ id: Number(id) });
  }

  //recuperer tous les creneaux
  @Get()
  getAll() {
    return this.sessionTypeService.getAll();
  }

  //cree un creneau
  @Post()
  async post(@Body() createSessionTypeDto: CreateSessionTypeDto) {
    const data: Prisma.session_typeCreateInput = {
      course_type_name: createSessionTypeDto.course_type_name,
      session_type_course_material: {
        connect: {
          id: createSessionTypeDto.course_material_id,
        },
      },
    };
    return this.sessionTypeService.post(data);
  }

  //update un creneau par son id
  @Put(':id')
  async putById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSessionTypeDto: UpdateSessionTypeDto
  ) {
    const data: Prisma.session_typeUpdateInput = {
      course_type_name: updateSessionTypeDto.course_type_name,
      session_type_course_material: {
        connect: { id: updateSessionTypeDto.course_material_id },
      },
    };
    return this.sessionTypeService.put(Number(id), data);
  }

  // Supprimer tous les types de session
  @Delete('/all')
  async deleteAllSessionTypes() {
    return this.sessionTypeService.deleteAll();
  }
  
  //supprimer par l'id
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.sessionTypeService.delete({ id: Number(id) });
  }

  // Créer des types de session
  @Post('/session_typefrom-ade')
  async createSessionTypes(@Body() sessionTypes: { course_type_name: string, course_material_id: number }[]) {
    return this.sessionTypeService.createADE(sessionTypes);
  }

}