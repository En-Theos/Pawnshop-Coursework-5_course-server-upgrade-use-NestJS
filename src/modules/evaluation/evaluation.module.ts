import { Module } from '@nestjs/common';
import { PricesController } from './evaluation-prices.controller';
import { EvaluationController } from './evaluation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesService } from './prices.service';
import { MetalPrices } from './entity/metal-prices.entity';
import { MonitorPrices } from './entity/monitor-prices.entity';
import { LaptopPrices } from './entity/laptop-prices.entity';
import { PhonePrices } from './entity/phone-prices.entity';
import { PhotoCameraPrices } from './entity/photo-camera-prices.entity';
import { TabletsPrices } from './entity/tablets-prices.entity';
import { TvPrices } from './entity/tv-prices.entity';
import { VideoCameraPrices } from './entity/video-camera-prices.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MetalPrices, 
      MonitorPrices, 
      LaptopPrices, 
      PhonePrices,
      PhotoCameraPrices,
      TabletsPrices,
      TvPrices,
      VideoCameraPrices
    ])
  ],
  controllers: [
    PricesController,
    EvaluationController
  ],
  providers: [PricesService]
})
export class PricesModule { }
