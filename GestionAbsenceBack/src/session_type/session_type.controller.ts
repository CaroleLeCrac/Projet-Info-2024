import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { SessionTypeService } from './session_type.service';
import { CreateSessionTypeDto } from './dto/create-session_type.dto';
import { UpdateSessionTypeDto } from './dto/update-session_type.dto';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Type de session')
@Controller('session_type')
export class SessionTypeController {
  constructor(private readonly sessionTypeService: SessionTypeService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un type de session par ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du type de session' })
  @ApiResponse({ status: 200, description: 'Type de session trouvé' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.sessionTypeService.get({ id: Number(id) });
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les types de session' })
  @ApiResponse({ status: 200, description: 'Liste des types de session' })
  getAll() {
    return this.sessionTypeService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Créer un type de session' })
  @ApiResponse({ status: 201, description: 'Type de session créé' })
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

  @Post('/from-ade')
  @ApiOperation({ summary: 'Créer plusieurs types de session depuis ADE' })
  @ApiResponse({ status: 201, description: 'Types de session créés' })
  async createSessionTypes(@Body() sessionTypes: { course_type_name: string; course_material_id: number }[] ) {
    return this.sessionTypeService.postSession_Type(sessionTypes);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un type de session' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du type de session à modifier' })
  @ApiResponse({ status: 200, description: 'Type de session mis à jour' })
  async putById(@Param('id', ParseIntPipe) id: number, @Body() updateSessionTypeDto: UpdateSessionTypeDto) {
    const data: Prisma.session_typeUpdateInput = {
      course_type_name: updateSessionTypeDto.course_type_name,
      session_type_course_material: {
        connect: { id: updateSessionTypeDto.course_material_id },
      },
    };
    return this.sessionTypeService.put(Number(id), data);
  }

  @Delete('/all')
  @ApiOperation({ summary: 'Supprimer tous les types de session' })
  @ApiResponse({ status: 200, description: 'Tous les types de session supprimés' })
  async deleteAllSessionTypes() {
    return this.sessionTypeService.deleteAll();
  }

  //supprimer par l'id
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un type de session par ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du type de session à supprimer' })
  @ApiResponse({ status: 200, description: 'Type de session supprimé' })
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.sessionTypeService.delete({ id: Number(id) });
  }
}
