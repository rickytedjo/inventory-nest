import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

const toInt = ({ value }: { value: unknown }) =>
    value === undefined || value === null || value === '' ? undefined : parseInt(value as string, 10);


export class createItemDto {
    @IsNotEmpty()
    @IsString()
    name:string;
    
    @IsNotEmpty()
    @IsUUID()
    kategori_id: string;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    price:number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    stock:number;
}

export class updateItemDto {
    @IsOptional()
    @IsString()
    name?:string;

    @IsOptional()
    @IsUUID()
    kategori_id?: string;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    price?:number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    stock?:number;
}