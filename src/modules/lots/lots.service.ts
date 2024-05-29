import { Injectable } from "@nestjs/common";
import { GoodsForSale } from "../goods/entity/goods-for-sale.entity";
import { GoodsService } from "../goods/goods.service";

@Injectable()
export class LotsService {
    constructor(
        private readonly goodsService: GoodsService,
    ) { }

    getAll() {
        return this.goodsService.getAllLots()
    }

    getOne({ id }: Pick<GoodsForSale, "id">) {
        return this.goodsService.getOneLot({ id })
    }

    async addView({ id }: Pick<GoodsForSale, "id">) {
        return this.goodsService.incrementViewsLot({ id })
    }

}