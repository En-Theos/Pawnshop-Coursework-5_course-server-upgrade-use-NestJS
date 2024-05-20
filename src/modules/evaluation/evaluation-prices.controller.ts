import { Controller, Get } from '@nestjs/common';

import { PricesService } from './prices.service';

import { MetalPrices } from './entity/metal-prices.entity';
import { MonitorPrices } from './entity/monitor-prices.entity';
import { LaptopPrices } from './entity/laptop-prices.entity';
import { PhonePrices } from './entity/phone-prices.entity';
import { PhotoCameraPrices } from './entity/photo-camera-prices.entity';
import { TabletsPrices } from './entity/tablets-prices.entity';
import { TvPrices } from './entity/tv-prices.entity';
import { VideoCameraPrices } from './entity/video-camera-prices.entity';

@Controller('prices')
export class PricesController {
    constructor(
        private pricesService: PricesService
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