import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Teacher } from './teacher.entity'
import { CreateTeacherDto } from './dtos/create-teacher.dto'
import { BadRequestException } from '@nestjs/common'
import { School } from 'src/schools/scholl.entity'
import { GetTeachersDto } from './dtos/get-teachers.dto'

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private TeacherRepo: Repository<Teacher>,
    @InjectRepository(School) private SchoolRepo: Repository<School>
  ) {}

  async createTeacher(body: CreateTeacherDto) {
    const payload = { ...body }
    const { school_id  } = payload
    payload.phone = payload.phone.replace(/\s/g, '')
    const teacher = this.TeacherRepo.create(payload)

    try {
      const school = await this.SchoolRepo.findOneBy({ id: school_id })
      teacher.school = school
      const dataTeacher = await this.TeacherRepo.save(teacher)
  
      return {
        msg: 'Teacher created!',
        data: {
          teacher: dataTeacher
        }
      }
    } catch(error) {
      const { detail } = error.driverError
      throw new BadRequestException(detail)
    }
  }

  async getTeachers(schoolId: GetTeachersDto) {
    try {
      if(!schoolId) {
        return await this.TeacherRepo.find()
      }

      return await this.TeacherRepo.createQueryBuilder('teacher')
        .where("teacher.schoolId = :schoolId", { schoolId })
        .getMany()
    } catch(error) {
      console.log(error)
      throw new BadRequestException()
    }
  }
}
