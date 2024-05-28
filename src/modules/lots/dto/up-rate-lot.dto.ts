import { IsNumber, IsString } from "class-validator";

export class UpRateLotDto {
    @IsNumber()
    goodsForSaleId: number;

    @IsNumber()
    rate: number;

    @IsString()
    name: string;

    @IsString()
    email: string;
}