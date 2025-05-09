import { Controller, Post, UploadedFile, UseInterceptors, ParseIntPipe, Param } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CsvService } from "./csv.service";

@Controller('csv')
export class CsvController {
    constructor(private readonly csvService : CsvService){}

    @Post('upload/student')
    @UseInterceptors(FileInterceptor('fileStudent')) //'fileStudent' c'est le nom du champ dans le formulaire (le name)
    async uploadFileStudent(@UploadedFile() file : Express.Multer.File){
        const filePath = file.path
        return this.csvService.parseCsvAddStudents(file.buffer);
    }

    @Post ('upload/inscription/:groupId')
    @UseInterceptors(FileInterceptor('fileInscription')) //'fileInscription' c'est le nom du champ dans le formulaire (le name)
    async uploadFileInscription(@Param('groupId', ParseIntPipe) groupId : number, @UploadedFile() file : Express.Multer.File){
        return this.csvService.parseCsvAddInscription(groupId ,file.buffer);
    }
}