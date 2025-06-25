import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCatDTO } from './CreateCatDTO';
import { CatsService } from './cats.service';
import { Cat } from './interface/cats.interface';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService){};

    @Get()
    findAll(): Cat[] {
        console.log('findAll called');
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id')id: string): string {
        return `This action returns a #${id} cat`;
    }

    @Post()
    create(@Body() createCatDTO: CreateCatDTO): String {
        this.catsService.create(createCatDTO);
        return '성공적으로 Create 되었습니다.'
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
