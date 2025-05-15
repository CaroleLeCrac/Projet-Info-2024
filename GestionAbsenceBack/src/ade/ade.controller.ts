import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AdeService } from './ade.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('ADE')
@Controller('ade')
export class AdeController {
  constructor(private readonly adeService: AdeService) {}

  @Get('recupMatieres')
  @ApiOperation({ summary: 'Récupérer toutes les matières depuis ADE' })
  @ApiResponse({ status: 200, description: 'Liste des matières récupérée avec succès.' })
  async getMatieres() {
    return this.adeService.getMatieres();
  }

  @Get('creneaux/:date')
  @ApiOperation({ summary: 'Récupérer les créneaux pour une date spécifique' })
  @ApiParam({ name: 'date', description: 'Date au format YYYY-MM-DD', type: String })
  async getCreneaux(@Param('date') date: string) {
    return this.adeService.getCreneaux(date);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Forcer l’actualisation des données depuis ADE' })
  @ApiResponse({ status: 201, description: 'Les données ADE ont été rafraîchies avec succès.' })
  async refreshDataFromAde() {
    await this.adeService.refreshADEData();
    return { message: 'ADE data refreshed and saved successfully' };
  }
}
