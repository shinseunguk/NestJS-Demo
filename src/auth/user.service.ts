import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { UserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findByFields(options: any): Promise<User | null> {
        return await this.userRepository.findOne(options);
    }

    async save(userDTO: UserDTO): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userDTO.password, saltRounds);
        const userToSave = { ...userDTO, password: hashedPassword };
        console.log(userToSave);
        return await this.userRepository.save(userToSave);
    }

    async transformPassword(user: UserDTO): Promise<void> {
        const saltRounds = 10;

        user.password = await bcrypt.hash(
            user.password, saltRounds
        );

        return Promise.resolve()
    }
}