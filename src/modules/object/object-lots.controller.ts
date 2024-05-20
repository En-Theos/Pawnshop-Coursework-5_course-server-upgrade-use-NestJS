import { Controller, Body, Get, Param, Patch } from '@nestjs/common';
import { UpRateLotDto } from './dto/up-rate-lot.dto';

@Controller('lots')
export class LotsController {

    @Get()
    async getAll() {

    }

    @Get(":id")
    async getOne(@Param("id") id: string) {

    }

    @Patch("up_rate")
    async upRate(@Body() dto: UpRateLotDto) {

    }

    @Patch("add_view:id")
    async addView(@Param() id: string) {

    }
    
}