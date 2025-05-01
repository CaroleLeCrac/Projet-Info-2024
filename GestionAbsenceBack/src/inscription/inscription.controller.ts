import { Controller, Get, Post,Put, Delete, Param, Body, ParseIntPipe } from "@nestjs/common";
import { InscriptionService} from "./inscription.service";
import { CreateInscriptionDto } from "./dto/create-inscription.dto";
import { Prisma } from "@prisma/client";

@Controller('inscription')
export class InscritpionController {
    constructor (private readonly inscriptionService : InscriptionService) {}

    @Get(':student_id/:group_id')
    async getById(@Param('student_id', ParseIntPipe) student_id: number, @Param ('group_id', ParseIntPipe) group_id: number)
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

    @Put(':studentId/:oldGroupId/:newGroupId')
    async putForOneGroup(@Param('studentId', ParseIntPipe) studentId : number, @Param('oldGroupId', ParseIntPipe) oldGroupId : number, @Param('newGroupId', ParseIntPipe) newGroupId : number){
        return this.inscriptionService.updateOneGroup(studentId, oldGroupId, newGroupId)
    }
    
    @Put('many/:studentId')
    async putMany(@Param('studentId', ParseIntPipe) studentId : number, @Body() groupIds : number[]){
        return this.inscriptionService.putMany(studentId, groupIds)
    }

    @Delete(':student_id/:group_id')
    async deleteById(@Param('student_id', ParseIntPipe) student_id: number, @Param('group_id', ParseIntPipe) group_id: number) {
      return this.inscriptionService.delete({student_id_group_id :{student_id, group_id}})
    }

    @Delete()
    async deleteMany(){
        return this.inscriptionService.deleteMany()
    }
}
