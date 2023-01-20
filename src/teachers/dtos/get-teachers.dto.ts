import { IsString, ValidateIf } from 'class-validator'

export class GetTeachersDto {
  @IsString()
  @ValidateIf((obj, value) => value !== undefined)
  schoolId: string | undefined
}