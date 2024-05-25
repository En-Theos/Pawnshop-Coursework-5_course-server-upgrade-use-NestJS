import { IsNumber, IsString } from "class-validator";

export class UpRateLotDto {
    @IsString()
    id: string;

    @IsNumber()
    rate: number;

    @IsString()
    name: string;

    @IsString()
    email: string;
}