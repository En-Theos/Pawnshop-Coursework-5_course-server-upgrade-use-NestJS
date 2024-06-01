import { IsString } from "class-validator";

export class AddRequestDto {
    @IsString()
    fullName: string;

    @IsString()
    email: string;

    @IsString()
    nameProduct: string;

    @IsString()
    type: string;

    @IsString()
    state: string;
}