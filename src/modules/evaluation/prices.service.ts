import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MetalPrices } from './entity/prices/metal-prices.entity';
import { MonitorPrices } from './entity/prices/monitor-prices.entity';
import { LaptopPrices } from "./entity/prices/laptop-prices.entity";
import { PhonePrices } from "./entity/prices/phone-prices.entity";
import { PhotoCameraPrices } from "./entity/prices/photo-camera-prices.entity";
import { TabletsPrices } from "./entity/prices/tablets-prices.entity";
import { TvPrices } from "./entity/prices/tv-prices.entity";
import { VideoCameraPrices } from "./entity/prices/video-camera-prices.entity";

@Injectable()
export class PricesService {
    constructor(
        @InjectRepository(MetalPrices)
        private metalPricesRepository: Repository<MetalPrices>,

        @InjectRepository(MonitorPrices)
        private monitorPricesRepository: Repository<MonitorPrices>,

        @InjectRepository(LaptopPrices)
        private laptopPricesRepository: Repository<LaptopPrices>,

        @InjectRepository(PhonePrices)
        private phonePricesRepository: Repository<PhonePrices>,

        @InjectRepository(PhotoCameraPrices)
        private photoCameraPricesRepository: Repository<PhotoCameraPrices>,

        @InjectRepository(TabletsPrices)
        private tabletsPricesRepository: Repository<TabletsPrices>,

        @InjectRepository(TvPrices)
        private tvPricesRepository: Repository<TvPrices>,

        @InjectRepository(VideoCameraPrices)
        private videoCameraPricesRepository: Repository<VideoCameraPrices>
    ) {}

    getMetalPrices () {
        return this.metalPricesRepository.find();
    }

    getMonitorPrices () {
        return this.monitorPricesRepository.find();
    }

    getLaptopPrices () {
        return this.laptopPricesRepository.find();
    }

    getPhonePrices () {
        return this.phonePricesRepository.find();
    }

    getPhotoCameraPrices () {
        return this.photoCameraPricesRepository.find();
    }

    getTabletsPricesPrices () {
        return this.tabletsPricesRepository.find();
    }

    getTvPricesPrices () {
        return this.tvPricesRepository.find();
    }

    getVideoCameraPricesPrices () {
        return this.videoCameraPricesRepository.find();
    }
}