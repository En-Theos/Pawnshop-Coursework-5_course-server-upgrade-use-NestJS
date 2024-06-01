import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RegistrationDto } from "./dto/registration";
import { UserService } from "../user/user.service";
import { ALREADY_REGISTERED_ERROR, INCORRECT_PASSWORD, USER_NOT_FOUND } from "./auth.constants";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { MailService } from "../mail/mail.service";
import { ConfigService } from "@nestjs/config";
import { Users } from "../user/entity/users.entity";
import { TokenService } from "../token/token.service";
import { LoginDto } from "./dto/login";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService
    ) { }

    async register(dto: RegistrationDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: Pick<Users, "email" | "id" | "name" | "isActivated">;
    }> {
        if (await this.userService.findUser({ email: dto.email })) {
            throw new UnauthorizedException(ALREADY_REGISTERED_ERROR)
        }

        const hashPassword = await bcrypt.hash(dto.password, 3)
        const activationLink = uuid.v4();

        const user = await this.userService.createUser({
            name: dto.name,
            email: dto.email,
            password: hashPassword,
            activationLink
        })

        await this.mailService.sendActivationMail(dto.email,
            this.configService.get<string>("server_domain") +
            this.configService.get<string>("server_port") +
            "/auth/activate/" +
            activationLink
        )

        const publicUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            isActivated: user.isActivated
        }

        const refreshToken = await this.tokenService.generateRefreshToken(publicUser);
        const accessToken = await this.tokenService.generateAccessToken(publicUser);

        await this.tokenService.saveRefreshToken({
            id: user.id,
            refresh_token: refreshToken
        })

        return {
            user: publicUser,
            accessToken,
            refreshToken
        }
    }

    async login(dto: LoginDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: Pick<Users, "email" | "id" | "name" | "isActivated">;
    }> {
        const user = await this.userService.findUser({ email: dto.email })

        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND)
        }

        if (!(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException(INCORRECT_PASSWORD)
        }

        const publicUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            isActivated: user.isActivated
        }

        const refreshToken = await this.tokenService.generateRefreshToken(publicUser);
        const accessToken = await this.tokenService.generateAccessToken(publicUser);

        await this.tokenService.saveRefreshToken({
            id: user.id,
            refresh_token: refreshToken
        })

        return {
            user: publicUser,
            accessToken,
            refreshToken
        }
    }

    logout(dto: Pick<Users, "refresh_token">): Promise<boolean> {
        return this.tokenService.removeRefreshToken({ refresh_token: dto.refresh_token });
    }

    async activate(dto: Pick<Users, "activationLink">): Promise<{
        refreshToken: string;
        accessToken: string;
        user: Pick<Users, "email" | "id" | "name" | "isActivated">;
    }> {
        const user = await this.userService.findUser({ activationLink: dto.activationLink });

        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND)
        }

        this.userService.updateUser({ id: user.id }, { isActivated: true });

        const publicUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            isActivated: user.isActivated
        }

        const refreshToken = await this.tokenService.generateRefreshToken(publicUser);
        const accessToken = await this.tokenService.generateAccessToken(publicUser);

        await this.tokenService.saveRefreshToken({
            id: user.id,
            refresh_token: refreshToken
        })

        return {
            user: publicUser,
            accessToken,
            refreshToken
        }
    }

    async refreshToken(dto: Pick<Users, "refresh_token">) {
        if (!dto.refresh_token) {
            throw new UnauthorizedException(USER_NOT_FOUND)
        }

        const userFromToken = await this.tokenService.validateRefreshToken({ refresh_token: dto.refresh_token })
        const userFromDB = await this.userService.findUser({ refresh_token: dto.refresh_token })

        if (!userFromToken || !userFromDB) {
            throw new UnauthorizedException(USER_NOT_FOUND)
        }

        const publicUser = {
            id: userFromDB.id,
            name: userFromDB.name,
            email: userFromDB.email,
            isActivated: userFromDB.isActivated
        }

        const refreshToken = await this.tokenService.generateRefreshToken(publicUser);
        const accessToken = await this.tokenService.generateAccessToken(publicUser);

        await this.tokenService.saveRefreshToken({
            id: userFromDB.id,
            refresh_token: refreshToken
        })

        return {
            user: publicUser,
            accessToken,
            refreshToken
        }
    }
}