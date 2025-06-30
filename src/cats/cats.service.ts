import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Cat } from 'src/entity/cats.entity';

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private catsRepository: Repository<Cat>,
    ){}

    findAll(): Promise<Cat[]> {
        return this.catsRepository.find();
    }

    findOne(id: number): Promise<Cat | null> {
        return this.catsRepository.findOne({ where: { id } });
    }


    async create(cat: Cat): Promise<void> {
        await this.catsRepository.save(cat);
    }

    async remove(id: number): Promise<void> {
        await this.catsRepository.delete(id);
    }

    async update(id: number, cat: Cat): Promise<void> {
        const existedCat = await this.findOne(id);
        if (existedCat) {
            await this.catsRepository.update(id, {
                name: cat.name,
                age: cat.age,
                breed: cat.breed,
            });
        }
    }
}
