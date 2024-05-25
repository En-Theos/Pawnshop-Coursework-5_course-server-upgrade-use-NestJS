import { Controller, Body, Get, Param, Patch } from '@nestjs/common';
import { UpRateLotDto } from './dto/up-rate-lot.dto';
import { GoodsService } from '../goods/goods.service';
import { Category } from '../goods/entity/goods-for-sale.entity';

@Controller('lots')
export class LotsController {

    constructor(
        private readonly goodsService: GoodsService
    ) {}

    @Get()
    async getAll() {
        return this.goodsService.getGoods(Category.AUCTION)
    }

    @Get(":id")
    async getOne(@Param("id") id: string) {
        
    }

    @Patch("up-bids")
    async upRate(@Body() dto: UpRateLotDto) {

    }

    @Patch("add-view:id")
    async addView(@Param() id: string) {

    }
    
}