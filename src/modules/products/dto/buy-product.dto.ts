import { IsNumber, IsString } from "class-validator";


export class BuyProductDto {
    @IsNumber()
    goodsForSaleId: number;

    @IsString()
    name_customer: string;

    @IsString()
    email: string;
}