import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.groupService.get({id});
    }

    @Get()
    getAll() {
        return this.groupService.getAll();
    }

    @Post()
    async put(@Body() createGroupDto : CreateGroupDto) {
        const {semester_id, name} = createGroupDto
        const data : Prisma.groupCreateInput = {
            group_semester : {
                connect: {id : semester_id}
            },
            name
        }
        return this.groupService.post(data);
    }

    @Put(':id')
    async putById(@Param('id', ParseIntPipe) id : number, @Body() updateGroupDto : UpdateGroupDto ) {
        const {semester_id, name} = updateGroupDto
        const data : Prisma.groupUpdateInput = {
            group_semester : { connect: { id : semester_id}},
            name
        }
        return this.groupService.put(id, data)
    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id : number){
        return this.groupService.delete(id)
    }
}
