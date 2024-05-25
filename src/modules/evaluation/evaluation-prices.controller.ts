import { Controller, Get } from '@nestjs/common';

import { PricesService } from './prices.service';

import { MetalPrices } from './entity/prices/metal-prices.entity';
import { MonitorPrices } from './entity/prices/monitor-prices.entity';
import { LaptopPrices } from './entity/prices/laptop-prices.entity';
import { PhonePrices } from './entity/prices/phone-prices.entity';
import { PhotoCameraPrices } from './entity/prices/photo-camera-prices.entity';
import { TabletsPrices } from './entity/prices/tablets-prices.entity';
import { TvPrices } from './entity/prices/tv-prices.entity';
import { VideoCameraPrices } from './entity/prices/video-camera-prices.entity';

@Controller('prices')
export class PricesController {
    constructor(
        private readonly pricesService: PricesService
    ) { }

    @Get("metal")
    getMetal(): Promise<MetalPrices[]> {
        return this.pricesService.getMetalPrices()
    }

    @Get("monitor")
    getMonitor(): Promise<MonitorPrices[]> {
        return this.pricesService.getMonitorPrices()
    }

    @Get("laptop")
    getLaptop(): Promise<LaptopPrices[]> {
        return this.pricesService.getLaptopPrices()
    }

    @Get("phone")
    getPhone(): Promise<PhonePrices[]> {
        return this.pricesService.getPhonePrices()
    }

    @Get("photo_camera")
    getPhotoCamera(): Promise<PhotoCameraPrices[]> {
        return this.pricesService.getPhotoCameraPrices()
    }

    @Get("tablet")
    getTablet(): Promise<TabletsPrices[]> {
        return this.pricesService.getTabletsPricesPrices()
    }

    @Get("tv")
    getTv(): Promise<TvPrices[]> {
        return this.pricesService.getTvPricesPrices()
    }

    @Get("video_camera")
    getVideoCamera(): Promise<VideoCameraPrices[]> {
        return this.pricesService.getVideoCameraPricesPrices()
    }

}