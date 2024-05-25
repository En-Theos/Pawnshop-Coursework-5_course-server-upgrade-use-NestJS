import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category, GoodsForSale } from "./entity/goods-for-sale.entity";

@Injectable()
export class GoodsService {
    constructor(
        @InjectRepository(GoodsForSale)
        private goodsForSaleRepository: Repository<GoodsForSale>,
    ) { }

    getGoods(category: Category) {
        return this.goodsForSaleRepository.find({
            where: { category },
            relations: {
                bids: true
            }
        })
    }
}