import { IsString, ValidateIf } from 'class-validator'

export class GetTeacherByIdDto {
  @IsString()
  @ValidateIf((obj, value) => value !== undefined)
  teacherId: string | undefined
}