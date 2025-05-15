import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupBySemesterNameDto } from './dto/create-group-semester-name.dto';
import { GroupService } from './group.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Groupe')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('year/:year')
  @ApiOperation({ summary: 'Récupérer les groupes par année' })
  @ApiParam({ name: 'year', type: Number })
  @ApiResponse({ status: 200, description: 'Groupes trouvés par année. Ex : En donnant 1 en paramètre, renvoie les groupes des semetres 1 et 2' })
  async getByYear(@Param('year', ParseIntPipe) year: number) {
    return this.groupService.getByYear(year);
  }

  @Get('by-student/:studentId')
  @ApiOperation({ summary: 'Récupérer les groupes auquels sont inscrit d’un étudiant' })
  @ApiParam({ name: 'studentId', type: Number })
  @ApiResponse({ status: 200, description: 'Groupes trouvés pour l’étudiant' })
  async getByStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.groupService.getByStudentId(studentId);
  }

  @Get('by-semester')
  @ApiOperation({ summary: 'Récupérer les groupes par le nom du semestre' })
  @ApiResponse({ status: 200, description: 'Groupes trouvés par semestre' })
  async getBySemesterName() {
    return this.groupService.getBySemester();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un groupe par son ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Groupe trouvé' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.get({ id });
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les groupes' })
  @ApiResponse({ status: 200, description: 'Liste de tous les groupes' })
  getAll() {
    return this.groupService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Créer un groupe' })
  @ApiResponse({ status: 201, description: 'Groupe créé avec succès' })
  async post(@Body() createGroupDto: CreateGroupDto) {
    const { semester_id, name } = createGroupDto;
    const data: Prisma.groupCreateInput = {
      group_semester: {
        connect: { id: semester_id },
      },
      name,
    };
    return this.groupService.post(data);
  }

  @Post('from-semester-name')
  @ApiOperation({ summary: 'Créer un groupe à partir du nom de semestre' })
  @ApiResponse({ status: 201, description: 'Groupe créé via nom de semestre' })
  async createGroup(@Body() createGroupBySemesterNameDto: CreateGroupBySemesterNameDto) {
    const { semester_name, name } = createGroupBySemesterNameDto;
    return this.groupService.createFromSemesterName(
      createGroupBySemesterNameDto,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un groupe par ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Groupe mis à jour' })
  async putById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const { semester_id, name } = updateGroupDto;
    const data: Prisma.groupUpdateInput = {
      group_semester: { connect: { id: semester_id } },
      name,
    };
    return this.groupService.put(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un groupe par ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Groupe supprimé' })
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.delete(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Supprimer tous les groupes' })
  @ApiResponse({ status: 200, description: 'Tous les groupes supprimés' })
  async deleteMany() {
    return this.groupService.deleteMany();
  }
}
