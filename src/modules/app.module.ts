import { Module } from "@nestjs/common";
import { PricesModule } from "./evaluation/evaluation.module";
import { GoodsModule } from './goods/goods.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LotsModule } from './lots/lots.module';
import { ProductsModule } from './products/products.module';
import { ContractsModule } from './contracts/contracts.module';
import { LeafModule } from './leaf/leaf.module';

import configurations from "../configurations"

@Module({
        imports: [
                ConfigModule.forRoot({
                        isGlobal: true,
                        load: [configurations]
                }),
                TypeOrmModule.forRootAsync({
                        imports: [ConfigModule],
                        useFactory: (configService: ConfigService) => ({
                                type: 'mysql',
                                host: configService.get('db_host'),
                                port: +configService.get('db_port'),
                                username: configService.get('db_user'),
                                password: configService.get('db_password'),
                                database: configService.get('db_name'),
                                autoLoadEntities: true
                        }),
                        inject: [ConfigService]
                }),
                GoodsModule,
                PricesModule,
                UserModule,
                AuthModule,
                LotsModule,
                ProductsModule,
                ContractsModule,
                LeafModule
        ]
})
export class AppModule { }