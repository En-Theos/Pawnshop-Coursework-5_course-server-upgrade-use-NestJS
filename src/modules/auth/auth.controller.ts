import { BadRequestException, Body, Controller, Get, Param, Post, Redirect, Req, Res } from '@nestjs/common';
import { RegistrationDto } from './dto/registration';
import { LoginDto } from './dto/login';
import { AuthService } from './auth.service';
import { Response, Request } from "express"
import { RegisterResponse } from './response/register.response';
import { LoginResponse } from './response/login.response';
import { LogoutResponse } from './response/logout.response';
import { FAILED_TO_EXIT } from './auth.constants';
import { ActivateEmailResponse } from './response/activate-email.response';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("registration")
    async registration(@Body() dto: RegistrationDto, @Res({ passthrough: true }) response: Response): Promise<RegisterResponse> {
        const data = await this.authService.register(dto);
        response.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

        return {
            user: data.user,
            accessToken: data.accessToken
        }
    }

    @Post("login")
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response): Promise<LoginResponse> {
        const data = await this.authService.login(dto);
        response.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

        return {
            user: data.user,
            accessToken: data.accessToken
        }
    }

    @Post("logout")
    async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<LogoutResponse> {
        const refreshToken = request.cookies["refreshToken"];

        const status = await this.authService.logout({ refresh_token: refreshToken });

        response.clearCookie("refreshToken");

        if (status) {
            return {
                massage: "Успішно розлогінено"
            }
        } else {
            throw new BadRequestException(FAILED_TO_EXIT);
        }
    }

    @Get("activate/:link")
    @Redirect('http://localhost:3000/user/', 301)
    async activateEmail(@Param("link") link: string, @Res({ passthrough: true }) response: Response): Promise<ActivateEmailResponse> {
        const data = await this.authService.activate({ activationLink: link });
        response.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

        return {
            user: data.user,
            accessToken: data.accessToken
        }
    }

    @Get("refresh")
    async refreshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const refreshToken = request.cookies["refreshToken"];

        const data = await this.authService.refreshToken({ refresh_token: refreshToken });
        response.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

        return {
            user: data.user,
            accessToken: data.accessToken
        }
    }

}
