import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Semestre')
@Controller('semester')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un semestre par ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du semestre' })
  @ApiResponse({ status: 200, description: 'Semestre trouvé' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.semesterService.get({ id });
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les semestres' })
  @ApiResponse({ status: 200, description: 'Liste des semestres' })
  getAll() {
    return this.semesterService.getAll();
  }

  @Post('/from-ade')
  @ApiOperation({ summary: 'Créer plusieurs semestres depuis ADE' })
  @ApiResponse({ status: 201, description: 'Semestres créés depuis ADE' })
  async postSemester(@Body() semesters: { name: string }[]) {
    return this.semesterService.postSemester(semesters);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un semestre' })
  @ApiResponse({ status: 201, description: 'Semestre créé avec succès' })
  async put(@Body() createSemesterDto: CreateSemesterDto) {
    return this.semesterService.post(createSemesterDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un semestre par ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du semestre' })
  @ApiResponse({ status: 200, description: 'Semestre mis à jour' })
  async putById(@Param('id', ParseIntPipe) id: number, @Body() updateSemesterDto: UpdateSemesterDto) {
    return this.semesterService.put(id, updateSemesterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un semestre par ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du semestre' })
  @ApiResponse({ status: 200, description: 'Semestre supprimé' })
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.semesterService.delete({ id });
  }

  @Delete('/all')
  @ApiOperation({ summary: 'Supprimer tous les semestres' })
  @ApiResponse({ status: 200, description: 'Tous les semestres supprimés' })
  async deleteAllSemesters() {
    return this.semesterService.deleteAll();
  }
}
