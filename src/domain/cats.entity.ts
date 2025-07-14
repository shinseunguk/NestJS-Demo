import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

@Entity()
export class Cat {
    @ApiProperty({
        description: '고양이 ID',
        example: 1,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: '고양이 이름',
        example: '야옹이',
    })
    @IsString()
    @IsNotEmpty()
    @Column()
    name: string;

    @ApiProperty({
        description: '고양이 나이',
        example: 3,
        minimum: 0,
    })
    @IsInt()
    @Min(0)
    @Column()
    age: number;

    @ApiProperty({
        description: '고양이 품종',
        example: '페르시안',
    })
    @IsString()
    @IsNotEmpty()
    @Column()
    breed: string;
}