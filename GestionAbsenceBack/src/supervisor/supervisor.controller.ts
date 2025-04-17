import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-dupervisor.dto';
import { Prisma } from '@prisma/client';

@Controller('supervisor')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) { }

  // Récupérer tous les superviseurs
  @Get()
  getAll() {
    return this.supervisorService.getAll();
  }

  // Récupérer un superviseur par son id
  @Get(':id')
  async getById(@Param('id') id: number) {
    console.log(id)
    return this.supervisorService.get({ id: Number(id) });
  }

  // Créer un superviseur
  @Post()
  async post(@Body() createSupervisorDto: CreateSupervisorDto) {
    const data: Prisma.supervisorCreateInput = {
      name: createSupervisorDto.name,
      mail: createSupervisorDto.mail,
    };

    return this.supervisorService.post(data);
  }

  // Mettre à jour un superviseur par son id
  @Put(':id')
  async putById(@Param('id') id: number, @Body() updateSupervisorDto: UpdateSupervisorDto) {
    const data: Prisma.supervisorUpdateInput = {
      name: updateSupervisorDto.name,
      mail: updateSupervisorDto.mail,
    };

    return this.supervisorService.put(Number(id), data);
  }

  // Supprimer un superviseur par son id
  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return this.supervisorService.delete({ id: Number(id) })
  }

}