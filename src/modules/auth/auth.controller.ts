import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegistrationDto } from './dto/registration';
import { LoginDto } from './dto/login';

@Controller('auth')
export class AuthController {

    @Post("registration")
    async registration(@Body() dto: RegistrationDto) {
        
    }

    @Post("login")
    async login(@Body() dto: LoginDto) {
        
    }

    @Post("logout")
    async logout() {

    }

    @Get("activate/:link")
    async activateEmail(@Param("link") link: string) {

    }

    @Get("refresh")
    async refreshToken() {

    }
    
}
