import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UpRateLotDto } from "./dto/up-rate-lot.dto";
import { GoodsForSale } from "../goods/entity/goods-for-sale.entity";
import { LOW_RATE } from "./lots.constants";
import { GoodsService } from "../goods/goods.service";

@Injectable()
export class LotsService {
    constructor(
        private readonly goodsService: GoodsService,
        private dataSource: DataSource
    ) { }

    getAll() {
        return this.goodsService.getAllLots()
    }

    getOne({ id }: Pick<GoodsForSale, "id">) {
        return this.goodsService.getOneLot({ id })
    }

    async upBids(dto: UpRateLotDto) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const good = await queryRunner.manager.findOne<GoodsForSale>("goods_for_sale", {
                where: { id: dto.goodsForSaleId }
            })

            if (good.market_price >= dto.rate) {
                throw new BadRequestException(LOW_RATE)
            }

            await queryRunner.manager.insert("bids", dto);
            await queryRunner.manager.update("goods_for_sale", dto.goodsForSaleId, { market_price: dto.rate });

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err
        } finally {
            await queryRunner.release();

            return "Успішно"
        }
    }

    async addView({ id }: Pick<GoodsForSale, "id">) {
        return this.goodsService.incrementViewsLot({ id })
    }

}