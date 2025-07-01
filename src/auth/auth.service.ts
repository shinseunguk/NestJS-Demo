import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async registerUser(newUser: UserDTO): Promise<UserDTO | undefined> {
        let userFind: UserDTO | null = await this.userService.findByFields({ 
            where: { username: newUser.username }
        });
        if(userFind) {
            throw new HttpException('Username aleady used!', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.save(newUser);
    }

    async valudateUser(user: UserDTO): Promise<UserDTO | undefined> {
        let userFind: UserDTO | null = await this.userService.findByFields({ 
            where: { username: user.username }
        });
        if(!userFind) {
            throw new UnauthorizedException('username을 찾을 수 없습니다.');
        }
        if(user.password != userFind.password) {
            throw new UnauthorizedException('password 오류');
        }

        return userFind
    }
}