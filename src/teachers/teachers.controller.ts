import { 
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { TeachersService } from './teachers.service'
import { CreateTeacherDto } from './dtos/create-teacher.dto'
import { GetTeachersDto } from './dtos/get-teachers.dto'

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  createTeacher(@Body() body: CreateTeacherDto) {
    return this.teachersService.createTeacher(body)
  }

  @Get()
  getTeachers(@Query('school_id') schoolId: GetTeachersDto) {
    return this.teachersService.getTeachers(schoolId)
  }
}
