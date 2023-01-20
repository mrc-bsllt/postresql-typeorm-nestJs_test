import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Student } from './student.entity'
import { CreateStudentDto } from './dtos/create-student.dto'
import { BadRequestException } from '@nestjs/common'

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private StudentRepo: Repository<Student>
  ) {}

  async createStudent(body: CreateStudentDto) {
    const payload = { ...body }
    const student = this.StudentRepo.create(payload)
    
    try {
      const dataStudent = await this.StudentRepo.save(student)
      return {
        msg: "Student created!",
        data: {
          student: dataStudent
        }
      }
    } catch(error) {
      const { detail } = error.driverError
      throw new BadRequestException(detail)
    }
  }
}
