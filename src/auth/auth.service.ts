import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

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

    async valudateUser(user: UserDTO): Promise<{ message: string; statusCode: number }> {
        let userFind: UserDTO | null = await this.userService.findByFields({ 
            where: { username: user.username }
        });
        
        if(!userFind) {
            throw new UnauthorizedException('username을 찾을 수 없습니다.');
        }
        
        const valudatePassword = await bcrypt.compare(user.password, userFind.password);
        if(!valudatePassword) {
            throw new UnauthorizedException('password 오류');
        }

        return {
            message: "로그인 성공",
            statusCode: 200
        };
    }
}