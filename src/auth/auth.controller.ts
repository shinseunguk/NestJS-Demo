import { Controller, Post, Body, Req, UseGuards, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/register')
    @UsePipes(ValidationPipe)
    async registerAccount(@Body() UserDTO: UserDTO): Promise<any> {
        return await this.authService.registerUser(UserDTO);
    }

    @Post('/login')
    async login(@Body() userDTO: UserDTO): Promise<any> {
        return await this.authService.valudateUser(userDTO);
    }

    @Get('/authenticate')
    @UseGuards(AuthGuard('jwt'))
    isAuthenticated(@Req() req: Request): any {
       const user: any = (req as any).user;
       return user;
    }
}
