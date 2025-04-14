import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SlotService } from './slot.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { Prisma } from '@prisma/client';

@Controller('slot')
export class SlotController {
  constructor(private readonly slotService: SlotService) { }

  //recuperer slot par son id
  @Get(':id')
  async getById(@Param('id') id: number) {
    console.log(id);
    return this.slotService.get({ id: Number(id) });
  }

  //recuperer tous les slots
  @Get()
  getAll() {
    return this.slotService.getAll();
  }

  //creer un slot
  @Post()
  async post(@Body() createSlotDto: CreateSlotDto) {
    const data: Prisma.slotCreateInput = {
      id: createSlotDto.id,
      starting_time: createSlotDto.starting_time,
      date: createSlotDto.date,
      num_session: createSlotDto.num_session,
      slot_group: {
        connect: { id: createSlotDto.group_id },
      },
      slot_supervisor: {
        connect: { id: createSlotDto.supervisor_id },
      },
      slot_session_type: {
        connect: { id: createSlotDto.session_type_id },
      },
    }
    return this.slotService.post(data);
  }

  //update un slot par son id
  @Put(':id')
  async putById(@Param('id') id: number, @Body() updateSlotDto: UpdateSlotDto) {
    return this.slotService.put(Number(id), updateSlotDto);
  }

  //supprimer un slot par son id
  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return this.slotService.delete({ id: Number(id) });
  }
}
