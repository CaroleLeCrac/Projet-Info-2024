import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AdeService } from './ade.service';

@Controller('ade')
export class AdeController {
    constructor(private readonly adeService: AdeService) { }

    @Get('recupMatieres')
    async getMatieres() {
        return this.adeService.getMatieres();
    }

    @Get('creneaux/:date')
    async getCreneaux(@Param('date') date: string) {
        return this.adeService.getCreneaux(date);
    }

    @Post('refresh')
    async refreshDataFromAde() {
        await this.adeService.refreshADEData();
        return { message: 'ADE data refreshed and saved successfully' };
    }
}
