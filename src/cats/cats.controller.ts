import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCatDTO } from './CreateCatDTO';

@Controller('cats')
export class CatsController {
    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

    @Get(':id')
    findOne(@Param('id')id: string): string {
        return `This action returns a #${id} cat`;
    }

    @Post()
    create(@Body() createCatDTO: CreateCatDTO): string {
        return `This action adds #${createCatDTO.name}, #${createCatDTO.age}, #${createCatDTO.breed} cat`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createCatDTO: CreateCatDTO): string {
        return `This action updates a #${id} => #${createCatDTO.name}, #${createCatDTO.age}, #${createCatDTO.breed} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string): string {
        return `This action removes a #${id} cat`;
    }
}
