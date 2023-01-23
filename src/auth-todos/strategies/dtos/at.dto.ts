import { IsNumber, IsEmail } from "class-validator"

export class AtDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;
}