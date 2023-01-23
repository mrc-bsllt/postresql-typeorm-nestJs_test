import { 
  IsEmail,
  IsString,
  IsNotEmpty
 } from "class-validator"

 export class UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
 }