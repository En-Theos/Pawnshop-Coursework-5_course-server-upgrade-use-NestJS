import { BadRequestException, Injectable } from "@nestjs/common";
import { GoodsService } from "../goods/goods.service";
import { DataSource, Repository } from "typeorm";
import { GoodsForSale, Status } from "../goods/entity/goods-for-sale.entity";
import { BuyProductDto } from "./dto/buy-product.dto";
import { ALREADY_PURCHASED } from "./products.constants";
import { InjectRepository } from "@nestjs/typeorm";
import { PurchaseOrders } from "./entity/purchase-orders.entuty";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(PurchaseOrders)
        private readonly purchaseOrdersRepository: Repository<PurchaseOrders>,

        private dataSource: DataSource
    ) { }

    getAllBy(where: Partial<PurchaseOrders>) {
        return this.dataSource
            .createQueryBuilder()
            .from(PurchaseOrders, "orders")
            .leftJoinAndSelect("orders.id_product", "goods")
            .select([
                "goods.name as name",
                "goods.market_price as market_price",
                "goods.picture as picture",
                "goods.description as description"
            ])
            .where(where)
            .getRawMany()
    }

    async buyProduct(dto: BuyProductDto) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const good = await queryRunner.manager.findOne<GoodsForSale>("goods_for_sale", {
                where: { id: dto.goodsForSaleId }
            })

            if (good.status === Status.PURCHASED) {
                throw new BadRequestException(ALREADY_PURCHASED)
            }

            await queryRunner.manager.update("goods_for_sale", dto.goodsForSaleId, { status: Status.PROCESSING });
            await queryRunner.manager.insert("purchase_orders", {
                name_customer: dto.name_customer,
                email: dto.email,
                id_product: dto.goodsForSaleId
            });

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