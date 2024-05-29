import { Controller, Body, Get, Param, Patch } from '@nestjs/common';
import { UpRateLotDto } from './dto/up-rate-lot.dto';
import { LotsService } from './lots.service';
import { GoodsForSale } from '../goods/entity/goods-for-sale.entity';
import { BidsService } from './bids.service';

@Controller('lots')
export class LotsController {

    constructor(
        private readonly lotsService: LotsService,
        private readonly bidsService: BidsService
    ) { }

    @Get()
    async getAll() {
        return this.lotsService.getAll()
    }

    @Get(":id")
    async getOne(@Param() { id }: Pick<GoodsForSale, "id">) {
        return this.lotsService.getOne({ id })
    }

    @Patch("up-rate")
    async upRate(@Body() dto: UpRateLotDto) {
        return this.bidsService.upBids(dto);
    }

    @Patch("add-view/:id")
    async addView(@Param() { id }: Pick<GoodsForSale, "id">) {
        return this.lotsService.addView({ id });
    }

}