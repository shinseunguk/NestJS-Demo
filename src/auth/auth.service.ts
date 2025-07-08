import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { User } from '../domain/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
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

    async validateUser(user: UserDTO): Promise<{accessToken: string}> {
        let userFind: User | null = await this.userService.findByFields({ 
            where: { username: user.username }
        });
        
        if(!userFind) {
            throw new UnauthorizedException('username을 찾을 수 없습니다.');
        }
        
        const valudatePassword = await bcrypt.compare(user.password, userFind.password);
        if(!valudatePassword) {
            throw new UnauthorizedException('password 오류');
        }

        const payload: Payload = { id: userFind.id, username: userFind.username };

        return {
            accessToken: this.jwtService.sign(payload)
        }
    }

    async tokenValidateUser(payload: Payload): Promise<User| null> {
        const userFind = await this.userService.findByFields({
            where: { id: payload.id }
        });
        this.flatAuthorities(userFind);
        return userFind;
    }

    private flatAuthorities(user: any): User {
        if(user && user.authorities){
            const authorities: string[] = [];
            user.authorities.forEach(authority => authorities.push(authority.authorityName));
            user.authorities = authorities;
        }
        return user;
    }
}