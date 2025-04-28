import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { Prisma } from '@prisma/client';

@Controller('presence')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) { }

  //recuperer une presence a aprtir du id de l'etudiant et du creneau
  @Get(':student_id/:slot_id')
  async getById(
    @Param('student_id') student_id: number,
    @Param('slot_id') slot_id: number
  ) {
    return this.presenceService.get({ student_id_slot_id: { student_id, slot_id } });
  }

  //recuperer toutes les presences
  @Get()
  getAll() {
    return this.presenceService.getAll();
  }

  //creer une presence 
  @Post()
  async post(@Body() createPresenceDto: CreatePresenceDto) {
    const data: Prisma.presenceCreateInput = {
      presence_student: {
        connect: { id: createPresenceDto.student_id },
      },
      presence_slot: {
        connect: { id: createPresenceDto.slot_id },
      },
      attendance: createPresenceDto.attendance,
    };
    return this.presenceService.post(data);
  }

  //supprimer 
  @Delete(':student_id/:slot_id')
  async deleteById(@Param('student_id') student_id: number, @Param('slot_id') slot_id: number) {
    return this.presenceService.delete({
      student_id, slot_id,
      student_id_slot_id: undefined
    });
  }
}