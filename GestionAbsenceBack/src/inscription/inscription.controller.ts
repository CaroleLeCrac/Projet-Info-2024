import { Controller, Get, Post, Delete, Param, Body } from "@nestjs/common";
import { InscriptionService} from "./inscription.service";
import { CreateInscriptionDto } from "./dto/create-inscriptipn.dto";
import { Prisma } from "@prisma/client";

@Controller('inscription')
export class InscritpionController {
    constructor (private readonly inscriptionService : InscriptionService) {}
    @Get(':student_id/:group_id')
    async getById(@Param('student_id') student_id: number, @Param ('group_id') group_id: number)
    {
        return this.inscriptionService.get({student_id_group_id : {student_id, group_id}})
    }

    @Get()
    getAll() {
      return this.inscriptionService.getAll();
    }

    @Post()
    async post(@Body() createInscriptionDto: CreateInscriptionDto) {
        const data: Prisma.inscriptionCreateInput = {
        inscription_student: {
            connect: { id: createInscriptionDto.student_id },
        },
        inscription_group: {
            connect: { id: createInscriptionDto.group_id },
        },
        };
        return this.inscriptionService.post(data);
    }

    @Delete(':student_id/:group_id')
    async deleteById(@Param('student_id') student_id: number, @Param('group_id') group_id: number) {
      return this.inscriptionService.delete({student_id_group_id :{student_id, group_id}})
    }
}
