import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Category, GoodsForSale } from "./entity/goods-for-sale.entity";

@Injectable()
export class GoodsService {
    constructor(
        @InjectRepository(GoodsForSale)
        private goodsForSaleRepository: Repository<GoodsForSale>,

        private dataSource: DataSource
    ) { }

    getAllLots() {
        return this.dataSource
            .createQueryBuilder()
            .select("goods")
            .from(GoodsForSale, "goods")
            .leftJoinAndSelect("goods.bids", "bids")
            .innerJoinAndSelect("goods.state", "state")
            .select([
                "goods.*",
                "state.description as descriptionState",
                "MAX(bids.rate) as rate",
                "COUNT(bids.id) as bids"
            ])
            .where("goods.category = :category", { category: Category.AUCTION })
            .groupBy("goods.id")
            .addGroupBy("state.description")
            .getRawMany()
    }

    getOneLot({ id }: Pick<GoodsForSale, "id">) {
        return this.dataSource
            .createQueryBuilder()
            .select("goods")
            .from(GoodsForSale, "goods")
            .leftJoinAndSelect("goods.bids", "bids")
            .innerJoinAndSelect("goods.state", "state")
            .select([
                "goods.*",
                "state.description as descriptionState",
                "MAX(bids.rate) as rate",
                "COUNT(bids.id) as bids"
            ])
            .where("goods.id = :id", { id })
            .groupBy("goods.id")
            .addGroupBy("state.description")
            .getRawOne()
    }

    async incrementViewsLot({ id }: Pick<GoodsForSale, "id">): Promise<boolean> {
        const incrementResult = await this.goodsForSaleRepository.increment({ id }, 'views', 1);

        return !!incrementResult.affected
    }
}