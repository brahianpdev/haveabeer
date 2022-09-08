import { IsString, IsOptional } from "class-validator";

export class UpdatePostDto {

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    image:string;

}