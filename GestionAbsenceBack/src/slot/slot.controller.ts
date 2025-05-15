import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe} from '@nestjs/common';
import { SlotService } from './slot.service';
import { CreateSlotDto } from './dto/create-slot-by-session.dto';
import { CreateSlotBySessionDto } from './dto/ceate-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Creneaux')
@Controller('slot')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un créneau par son ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du créneau' })
  @ApiResponse({ status: 200, description: 'Créneau trouvé' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.slotService.get({ id: Number(id) });
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les créneaux' })
  @ApiResponse({ status: 200, description: 'Liste complète des créneaux' })
  getAll() {
    return this.slotService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Créer un créneau' })
  @ApiResponse({ status: 201, description: 'Créneau créé avec succès' })
  async post(@Body() createSlotDto: CreateSlotDto) {
    const data: Prisma.slotCreateInput = {
      date: createSlotDto.date,
      slot_group: {
        connect: { id: createSlotDto.group_id },
      },
      slot_session_type: {
        connect: { id: createSlotDto.session_type_id },
      },
    };
    return this.slotService.post(data);
  }

  @Post('by-session')
  @ApiOperation({ summary: 'Créer un slot via un type de session' })
  @ApiResponse({ status: 201, description: 'Slot créé via le nom d’une matière et le nom de son type de session' })
  async postBySession(@Body() createSlotBySessionDto: CreateSlotBySessionDto) {
    return this.slotService.postBySessionName(createSlotBySessionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un créneau par ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du créneau à modifier' })
  @ApiResponse({ status: 200, description: 'Créneau mis à jour' })
  async putById(@Param('id', ParseIntPipe) id: number, @Body() updateSlotDto: UpdateSlotDto) {
    return this.slotService.put(Number(id), updateSlotDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un créneau par ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID du créneau à supprimer' })
  @ApiResponse({ status: 200, description: 'Créneau supprimé' })
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.slotService.delete({ id: Number(id) });
  }

  @Delete()
   @ApiOperation({ summary: 'Supprimer tous les créneaux' })
  @ApiResponse({ status: 200, description: 'Suppression en masse réussie' })
  async deleteMany() {
    return this.slotService.deleteMany();
  }
}
