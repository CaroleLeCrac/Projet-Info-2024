import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Presence')
@Controller('presence')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @Get('by-year/:year')
  @ApiOperation({ summary: 'Récupérer les absences par année' })
  @ApiParam({ name: 'year', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Liste des absences pour une année donnée. Ex : en donnant 1 en paramètre, renvoie les absences des semestres 1 et 2' })
  async GetByYear(@Param('year', ParseIntPipe) year: number) {
    return this.presenceService.getByYear(year);
  }

  @Get(':student_id/:slot_id')
  @ApiOperation({ summary: 'Récupérer une absence spécifique (étudiant et créneau)' })
  @ApiParam({ name: 'student_id', type: Number })
  @ApiParam({ name: 'slot_id', type: Number })
  @ApiResponse({ status: 200, description: 'Absence trouvée' })
  async getById(@Param('student_id', ParseIntPipe) student_id: number, @Param('slot_id', ParseIntPipe) slot_id: number) {
    return this.presenceService.get({
      student_id_slot_id: { student_id, slot_id },
    });
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les absence' })
  @ApiResponse({ status: 200, description: 'Liste complète des absences' })
  getAll() {
    return this.presenceService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Créer une absence' })
  @ApiResponse({ status: 201, description: 'Absence créée avec succès' })
  async post(@Body() createPresenceDto: CreatePresenceDto) {
    const data: Prisma.presenceCreateInput = {
      presence_student: {
        connect: { id: createPresenceDto.student_id },
      },
      presence_slot: {
        connect: { id: createPresenceDto.slot_id },
      },
    };
    return this.presenceService.post(data);
  }

  @Post('many/:slot_id')
  @ApiOperation({ summary: 'Créer plusieurs absences pour un créneau donné' })
  @ApiParam({ name: 'slot_id', type: Number })
  @ApiResponse({ status: 201, description: 'Absences multiples créées avec succès' })
  async postMany(@Param('slot_id', ParseIntPipe) slot_id: number, @Body() student_ids: number[]) {
    return this.presenceService.postMany(slot_id, student_ids);
  }

  @Delete(':student_id/:slot_id')
  @ApiOperation({ summary: 'Supprimer une absence (étudiant et créneau)' })
  @ApiParam({ name: 'student_id', type: Number })
  @ApiParam({ name: 'slot_id', type: Number })
  @ApiResponse({ status: 200, description: 'Absence supprimée' })
  async deleteById(@Param('student_id', ParseIntPipe) student_id: number, @Param('slot_id', ParseIntPipe) slot_id: number) {
    return this.presenceService.delete({
      student_id,
      slot_id,
      student_id_slot_id: undefined,
    });
  }

  @Delete()
  @ApiOperation({ summary: 'Supprimer toutes les absences' })
  @ApiResponse({ status: 200, description: 'Toutes les absences ont été supprimées' })
  async deleteMany() {
    return this.presenceService.deleteMany();
  }
}
