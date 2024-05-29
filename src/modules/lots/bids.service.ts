import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UpRateLotDto } from "./dto/up-rate-lot.dto";
import { Category, GoodsForSale } from "../goods/entity/goods-for-sale.entity";
import { LOW_RATE, NOT_AN_AUCTION_ITEM } from "./lots.constants";
import { Bids } from "./entity/bids.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BidsService {
    constructor(
        @InjectRepository(Bids)
        private readonly bidsRepository: Repository<Bids>,

        private dataSource: DataSource
    ) { }


    getAllBy(where: Partial<Bids>) {
        return this.bidsRepository.findBy(where)
    }

    async upBids(dto: UpRateLotDto) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const good = await queryRunner.manager.findOne<GoodsForSale>("goods_for_sale", {
                where: { id: dto.goodsForSaleId }
            })

            if (good.category !== Category.AUCTION) {
                throw new BadRequestException(NOT_AN_AUCTION_ITEM);
            }

            if (good.market_price >= dto.rate) {
                throw new BadRequestException(LOW_RATE);
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

}