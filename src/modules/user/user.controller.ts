import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request } from "express"

@Controller('user')
export class UserController {

    @UseGuards(JwtAuthGuard)
    @Get("bids")
    async getBids(@Req() req: Request) {
        const user = req.user;
        
    }

    @UseGuards(JwtAuthGuard)
    @Get("orders")
    async getOrders(@Req() req: Request) {
        const user = req.user;
        
    }

    @UseGuards(JwtAuthGuard)
    @Get("evaluation")
    async getEvaluation(@Req() req: Request) {
        const user = req.user;
        
    }

}
