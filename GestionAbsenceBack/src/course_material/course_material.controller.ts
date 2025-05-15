import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CourseMaterialService } from './course_material.service';
import { CreateCourseMaterialDto } from './dto/create-course_material.dto';
import { UpdateCourseMaterialDto } from './dto/update-course_material.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Matiere')
@Controller('course_material')
export class CourseMaterialController {
  constructor(private readonly courseMaterialService: CourseMaterialService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une matière par son ID' })
  @ApiParam({ name: 'id', type: Number })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.courseMaterialService.get({ id });
  }

  @Get('presence/student/:studentId')
  @ApiOperation({ summary: 'Récupérer les absence avec la matière associé pour un étudiant donné' })
  @ApiParam({ name: 'studentId', type: Number })
  async getByStudentIdWithPresence(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.courseMaterialService.getByStudentWithPresence(studentId);
  }

  @Get('by-student/:studentId')
  @ApiOperation({ summary: 'Récupérer les matières du même semestre que cet étudiant' })
  @ApiParam({ name: 'studentId', type: Number })
  async getCourseMaterialByStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.courseMaterialService.getByStudent(studentId);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les matières' })
  getAll() {
    return this.courseMaterialService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Créer une matière' })
  async put(@Body() createCourseMaterialDto: CreateCourseMaterialDto) {
    const { semester_id, name } = createCourseMaterialDto;
    const data: Prisma.course_materialCreateInput = {
      course_material_semester: {
        connect: { id: semester_id },
      },
      name,
    };
    return this.courseMaterialService.post(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une matière' })
  @ApiParam({ name: 'id', type: Number })
  async putById(@Param('id', ParseIntPipe) id: number, @Body() updateCourseMaterialDto: UpdateCourseMaterialDto) {
    const { semester_id, name } = updateCourseMaterialDto;
    const data: Prisma.course_materialUpdateInput = {
      course_material_semester: { connect: { id: semester_id } },
      name,
    };
    return this.courseMaterialService.put(id, data);
  }

  @Delete('/all')
  @ApiOperation({ summary: 'Supprimer toutes les matières' })
  async deleteAllCourseMaterials() {
    return this.courseMaterialService.deleteAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une matière par ID' })
  @ApiParam({ name: 'id', type: Number })
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.courseMaterialService.delete(id);
  }

  @Post('/from-ade')
  @ApiOperation({ summary: 'Créer plusieurs matières via ADE' })
  async createCourseMaterials(
    @Body() course_materials: { name: string; semester_id: number }[],
  ) {
    return this.courseMaterialService.postCourse_Material(course_materials);
  }
}
