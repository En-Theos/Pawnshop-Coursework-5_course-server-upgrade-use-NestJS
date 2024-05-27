import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../user/entity/users.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    generateRefreshToken(payload: Pick<Users, "email" | "id" | "name" | "isActivated">): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>("jwt_refresh_secret_key"),
            expiresIn: '30d'
        })
    }

    generateAccessToken(payload: Pick<Users, "email" | "id" | "name" | "isActivated">): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>("jwt_access_secret_key"),
            expiresIn: '30m'
        })
    }

    saveRefreshToken(dto: Pick<Users, "id" | "refresh_token">): Promise<boolean> {
        return this.userService.updateUser({ id: dto.id }, { refresh_token: dto.refresh_token })
    }

    removeRefreshToken(dto: Pick<Users, "refresh_token">): Promise<boolean> {
        return this.userService.updateUser({ refresh_token: dto.refresh_token }, { refresh_token: "" })
    }

    async validateRefreshToken(dto: Pick<Users, "refresh_token">): Promise<Pick<Users, "id" | "name" | "email" | "isActivated">> {
        try {
            const payload = await this.jwtService.verifyAsync(
                dto.refresh_token,
                {
                    secret: this.configService.get<string>("jwt_refresh_secret_key")
                }
            );
            
            return payload;
        } catch {
            throw new UnauthorizedException();
        }
    }

}
