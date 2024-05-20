import { IsString } from "class-validator";

export class AddLeafDto {
    @IsString()
    name: string;

    @IsString()
    email: string;
    
    @IsString()
    phone: string;
    
    @IsString()
    message: string;
}