import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { UserDTO } from "./dto/user.dto";

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
        return await this.userRepository.save(userDTO);
    }
}