import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { SlotService } from './slot.service';
import { CreateSlotDto } from './dto/ceate-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { Prisma } from '@prisma/client';

@Controller('slot')
export class SlotController {
  constructor(private readonly slotService: SlotService) { }

  //recuperer slot par son id
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
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
      date: createSlotDto.date,
      slot_group: {
        connect: { id: createSlotDto.group_id },
      },
      slot_session_type: {
        connect: { id: createSlotDto.session_type_id },
      },
    }
    return this.slotService.post(data);
  }

  //update un slot par son id
  @Put(':id')
  async putById(@Param('id', ParseIntPipe) id: number, @Body() updateSlotDto: UpdateSlotDto) {
    return this.slotService.put(Number(id), updateSlotDto);
  }

  //supprimer un slot par son id
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.slotService.delete({ id: Number(id) });
  }
}