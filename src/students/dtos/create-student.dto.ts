import { 
  IsNotEmpty,
  IsString,
  IsEmail, 
  IsMobilePhone 
} from 'class-validator'

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsEmail()
  email: string;
}