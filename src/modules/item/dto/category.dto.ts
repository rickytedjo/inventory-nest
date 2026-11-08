import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createCategoryDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsOptional()
    @IsString()
    description:string;
}

export class updateCategoryDto {
    @IsOptional()
    @IsString()
    name?:string;

    @IsOptional()
    @IsString()
    description?:string;
}