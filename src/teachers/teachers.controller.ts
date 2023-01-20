import { 
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe
} from '@nestjs/common';
import { TeachersService } from './teachers.service'
import { CreateTeacherDto } from './dtos/create-teacher.dto'
import { GetTeachersDto } from './dtos/get-teachers.dto'
import { GetTeacherByIdDto } from './dtos/get-teacher-by-id.dto'

@Controller('teachers')
@UseInterceptors(ClassSerializerInterceptor)
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Post()
  createTeacher(@Body() body: CreateTeacherDto) {
    return this.teachersService.createTeacher(body)
  }

  @Get()
  getTeachers(
    @Query('school_id') schoolId: GetTeachersDto
  ) {
    return this.teachersService.getTeachers(schoolId)
  }

  @Get(':teacher_id')
  getTeacherById(
    @Param('teacher_id', ParseIntPipe) teacherId: GetTeacherByIdDto
  ) {
    return this.teachersService.getTeacherById(teacherId)
  }
}
