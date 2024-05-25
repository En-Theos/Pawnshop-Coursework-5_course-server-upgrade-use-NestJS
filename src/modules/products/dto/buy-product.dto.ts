import { IsString } from "class-validator";


export class BuyProductDto {
    @IsString()
    id: string;

    @IsString()
    nameCustomer: string;

    @IsString()
    email: string;

    @IsString()
    nameProduct: string;
}