import { 
  IsNotEmpty,
  IsString,
  IsEmail, 
  IsMobilePhone, 
  IsInt
} from 'class-validator'

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsInt()
  school_id: number
}