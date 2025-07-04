import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './payload.interface';
import { UserService } from '../user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET_KEY', // auth.module.ts의 secret과 동일하게 설정
        });
    }

    async validate(payload: Payload) {
        const user = await this.userService.findByFields({
            where: { id: payload.id }
        });
        if (!user) {
            throw new UnauthorizedException('사용자를 찾을 수 없습니다');
        }
        return user;
    }
}