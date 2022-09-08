// External modules
import { IsString } from "class-validator";

export class CreatePostDto {
  // Post 
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  _user: string;

}


