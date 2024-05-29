import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request } from "express"
import { Users } from './entity/users.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get("bids")
    async getBids(@Req() req: Request) {
        const user = req.user as Pick<Users, "id" | "name" | "email" | "isActivated">;

        return this.userService.getUserBids({ email: user.email })
    }

    @UseGuards(JwtAuthGuard)
    @Get("orders")
    async getOrders(@Req() req: Request) {
        const user = req.user as Pick<Users, "id" | "name" | "email" | "isActivated">;

        return this.userService.getUserOrders({ email: user.email })
    }

    @UseGuards(JwtAuthGuard)
    @Get("evaluation")
    async getEvaluation(@Req() req: Request) {
        const user = req.user as Pick<Users, "id" | "name" | "email" | "isActivated">;

        return this.userService.getUserEvaluation({ email: user.email })
    }

}
