import { Controller, Post, Body } from '@nestjs/common'
import { StudentsService } from './students.service'
import { CreateStudentDto } from './dtos/create-student.dto'

@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @Post()
  createStudent(@Body() body: CreateStudentDto) {
    return this.studentService.createStudent(body)
  }
}
