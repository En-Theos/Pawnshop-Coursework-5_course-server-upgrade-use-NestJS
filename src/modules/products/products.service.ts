import { Injectable } from "@nestjs/common";
import { GoodsService } from "../goods/goods.service";
import { GoodsForSale } from "../goods/entity/goods-for-sale.entity";

@Injectable()
export class ProductsService {
    constructor(
        private readonly goodsService: GoodsService,
    ) { }

    getAll() {
        return this.goodsService.getAllProducts();
    }

    getOne({ id }: Pick<GoodsForSale, "id">) {
        return this.goodsService.getOneProduct({ id })
    }

}