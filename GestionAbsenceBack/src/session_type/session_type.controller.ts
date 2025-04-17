import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SessionTypeService } from './session_type.service';
import { CreateSessionTypeDto } from './dto/create-session_type.dto';
import { UpdateSessionTypeDto } from './dto/update-session_type.dto';
import { Prisma } from '@prisma/client';

@Controller('session_type')
export class SessionTypeController {
  constructor(private readonly sessionTypeService: SessionTypeService) { }

  //recuperer par l'id les creneaux
  @Get(':id')
  async getById(@Param('id') id: number) {
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
      nb_repetitions: createSessionTypeDto.nb_repetitions,
      full_promo: createSessionTypeDto.full_promo,
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
    @Param('id') id: number,
    @Body() updateSessionTypeDto: UpdateSessionTypeDto
  ) {
    const data: Prisma.session_typeUpdateInput = {
      course_type_name: updateSessionTypeDto.course_type_name,
      nb_repetitions: updateSessionTypeDto.nb_repetitions,
      full_promo: updateSessionTypeDto.full_promo,
      session_type_course_material: {
        connect: { id: updateSessionTypeDto.course_material_id },
      },
    };
    return this.sessionTypeService.put(Number(id), data);
  }

  //supprimer par l'id
  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return this.sessionTypeService.delete({ id: Number(id) });
  }
}