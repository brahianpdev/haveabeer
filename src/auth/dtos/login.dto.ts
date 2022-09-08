// External modules
import { IsEmail, IsNotEmpty } from "class-validator";

export class LogInDto {
    @IsNotEmpty()
    @IsEmail()
    public email: string;
  
    @IsNotEmpty()
    public password: string;
  }