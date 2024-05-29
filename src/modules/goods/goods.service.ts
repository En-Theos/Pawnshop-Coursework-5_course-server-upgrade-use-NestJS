import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Category, GoodsForSale } from "./entity/goods-for-sale.entity";
import { NOT_AN_AUCTION_ITEM } from "../lots/lots.constants";

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

    getAllProducts() {
        return this.dataSource
            .createQueryBuilder()
            .from(GoodsForSale, "goods")
            .innerJoinAndSelect("goods.state", "state")
            .select([
                "goods.*",
                "state.description as descriptionState"
            ])
            .where("goods.category = :category", { category: Category.SALE })
            .andWhere("goods.status != 'куплено'")
            .groupBy("goods.id")
            .addGroupBy("state.description")
            .getRawMany()
    }

    getOneLot({ id }: Pick<GoodsForSale, "id">) {
        return this.dataSource
            .createQueryBuilder()
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
            .andWhere("goods.category = :category", { category: Category.AUCTION })
            .groupBy("goods.id")
            .addGroupBy("state.description")
            .getRawOne()
    }

    getOneProduct({ id }: Pick<GoodsForSale, "id">) {
        return this.dataSource
            .createQueryBuilder()
            .from(GoodsForSale, "goods")
            .innerJoinAndSelect("goods.state", "state")
            .select([
                "goods.*",
                "state.description as descriptionState"
            ])
            .where("goods.id = :id", { id })
            .andWhere("goods.category = :category", { category: Category.SALE })
            .andWhere("goods.status != 'куплено'")
            .groupBy("goods.id")
            .addGroupBy("state.description")
            .getRawOne()
    }

    async incrementViewsLot({ id }: Pick<GoodsForSale, "id">): Promise<boolean> {
        const incrementResult = await this.goodsForSaleRepository.increment({ id, category: Category.AUCTION }, 'views', 1);

        if (!incrementResult.affected) {
            throw new BadRequestException(NOT_AN_AUCTION_ITEM);
        } else {
            return true
        }
    }


}