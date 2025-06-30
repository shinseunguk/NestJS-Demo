import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    age: number;

    @Column()
    breed: string;
}