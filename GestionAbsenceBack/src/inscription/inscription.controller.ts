import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Inscription')
@Controller('inscription')
export class InscritpionController {
  constructor(private readonly inscriptionService: InscriptionService) {}

  @Get(':student_id/:group_id')
  @ApiOperation({ summary: 'Récupérer une inscription spécifique (étudiant et groupe)' })
  @ApiParam({ name: 'student_id', type: Number })
  @ApiParam({ name: 'group_id', type: Number })
  @ApiResponse({ status: 200, description: 'Inscription trouvée' })
  async getById(@Param('student_id', ParseIntPipe) student_id: number, @Param('group_id', ParseIntPipe) group_id: number) {
    return this.inscriptionService.get({
      student_id_group_id: { student_id, group_id },
    });
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les inscriptions' })
  @ApiResponse({ status: 200, description: 'Liste des inscriptions' })
  getAll() {
    return this.inscriptionService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Créer une inscription' })
  @ApiResponse({ status: 201, description: 'Inscription créée avec succès' })
  async post(@Body() createInscriptionDto: CreateInscriptionDto) {
    const data: Prisma.inscriptionCreateInput = {
      inscription_student: {
        connect: { id: createInscriptionDto.student_id },
      },
      inscription_group: {
        connect: { id: createInscriptionDto.group_id },
      },
    };
    return this.inscriptionService.post(data);
  }

  @Put(':studentId/:oldGroupId/:newGroupId')
  @ApiOperation({ summary: 'Changer une inscription a un groupe pour un étudiant' })
  @ApiParam({ name: 'studentId', type: Number })
  @ApiParam({ name: 'oldGroupId', type: Number })
  @ApiParam({ name: 'newGroupId', type: Number })
  @ApiResponse({ status: 200, description: 'Inscription mise à jour' })
  async putForOneGroup(@Param('studentId', ParseIntPipe) studentId: number, @Param('oldGroupId', ParseIntPipe) oldGroupId: number, @Param('newGroupId', ParseIntPipe) newGroupId: number) {
    return this.inscriptionService.updateOneGroup(
      studentId,
      oldGroupId,
      newGroupId,
    );
  }

  @Put('many/:studentId')
  @ApiOperation({ summary: 'Mettre à jour toutes les inscription aux groupes pour un étudiant' })
  @ApiParam({ name: 'studentId', type: Number })
  async putMany(@Param('studentId', ParseIntPipe) studentId: number, @Body() groupIds: number[]) {
    return this.inscriptionService.putMany(studentId, groupIds);
  }

  @Delete(':student_id/:group_id')
  @ApiOperation({ summary: 'Supprimer une inscription (étudiant et groupe)' })
  @ApiParam({ name: 'student_id', type: Number })
  @ApiParam({ name: 'group_id', type: Number })
  @ApiResponse({ status: 200, description: 'Inscription supprimée' })
  async deleteById(@Param('student_id', ParseIntPipe) student_id: number, @Param('group_id', ParseIntPipe) group_id: number) {
    return this.inscriptionService.delete({
      student_id_group_id: { student_id, group_id },
    });
  }

  @Delete()
  @ApiOperation({ summary: 'Supprimer toutes les inscriptions' })
  @ApiResponse({ status: 200, description: 'Toutes les inscriptions ont été supprimées' })
  async deleteMany() {
    return this.inscriptionService.deleteMany();
  }
}
