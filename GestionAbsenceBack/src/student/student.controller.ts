import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Etudiant')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('presence/course/:courseId')
  @ApiOperation({ summary:'Liste les étudiants avec la date de leur absence pour un cours donné' })
  @ApiParam({ name: 'courseId', type: Number, description: 'ID de la matière' })
  @ApiResponse({ status: 200, description: 'Liste des étudiants avec la date de leur absence' })
  async getBycourseIdWithPresence(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.studentService.getByCourseWithPresence(courseId);
  }

  @Get('by-group/:groupId')
  @ApiOperation({ summary: 'Liste les étudiants qui sont inscrit dans un groupe donné' })
  @ApiParam({ name: 'groupId', type: Number, description: 'ID du groupe' })
  @ApiResponse({ status: 200, description: 'Liste des étudiants inscrit dans le groupe' })
  async getByGroupId(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.studentService.getByGroup(groupId);
  }

  @Get('by-course_material/:courseMaterialId')
  @ApiOperation({ summary: 'Liste les étudiants qui sont dans le même semestre que le cours/matière donné' })
  @ApiParam({ name: 'courseMaterialId', type: Number, description: 'ID de la matière' })
  @ApiResponse({ status: 200, description: 'Liste des étudiants du même semestre que la matière' })
  async getByCourseMaterialSemester(@Param('courseMaterialId', ParseIntPipe) courseMaterialId: number) {
    return this.studentService.getByCourseMaterial(courseMaterialId);
  }

  @Get('same-other-group/:groupId')
  @ApiOperation({ summary: 'Étudiants dans un groupes similaires du même semestre' })
  @ApiParam({ name: 'groupId', type: Number, description: 'ID du groupe de référence' })
  @ApiResponse({ status: 200, description: 'Liste des étudiants des groupes similaire du même semetres ou du même semestre et qui ne sont pas dans le groupe de références si pas de groupe similaire (groupe similaire = un caractère de différences. ex: Groupe 1 et Groupe 2'})
  async getByOtherGroup(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.studentService.getByOtherGroups(groupId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un étudiant par ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de l’étudiant' })
  @ApiResponse({ status: 200, description: 'Étudiant trouvé' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.get({ id });
  }

  @Get()
  @ApiOperation({ summary: 'Récupère tous les étudiants' })
  @ApiResponse({ status: 200, description: 'Liste complète des étudiants' })
  getAll() {
    return this.studentService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crée un nouvel étudiant' })
  @ApiResponse({ status: 201, description: 'Étudiant créé avec succès' })
  async put(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.post(createStudentDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un étudiant par ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de l’étudiant' })
  @ApiResponse({ status: 200, description: 'Étudiant mis à jour' })
  async putById(@Param('id', ParseIntPipe) id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.put(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un étudiant par ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de l’étudiant à supprimer' })
  @ApiResponse({ status: 200, description: 'Étudiant supprimé' })
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.delete({ id });
  }

  @Delete()
  @ApiOperation({ summary: 'Supprime tous les étudiants' })
  @ApiResponse({ status: 200, description: 'Suppression en masse effectuée' })
  async deleteMany() {
    return this.studentService.deleteMany();
  }
}
