import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request } from "express"
import { Users } from './entity/users.entity';

@Controller('user')
export class UserController {

    @UseGuards(JwtAuthGuard)
    @Get("bids")
    async getBids(@Req() req: Request) {
        const user = req.user as Pick<Users, "id" | "name" | "email" | "isActivated">;

        
    }

    @UseGuards(JwtAuthGuard)
    @Get("orders")
    async getOrders(@Req() req: Request) {
        const user = req.user as Pick<Users, "id" | "name" | "email" | "isActivated">;
        
    }

    @UseGuards(JwtAuthGuard)
    @Get("evaluation")
    async getEvaluation(@Req() req: Request) {
        const user = req.user as Pick<Users, "id" | "name" | "email" | "isActivated">;
        
    }

}
