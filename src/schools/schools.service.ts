import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { School } from './scholl.entity'
import { CreateSchollDto } from './dtos/create-scholl.dto'
import { BadRequestException } from '@nestjs/common'

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private SchoolRepo: Repository<School>
  ) {}

  async createSchool(body: CreateSchollDto) {
    const school = this.SchoolRepo.create({ ...body })

    try {
      const schoolData = await this.SchoolRepo.save(school)
      return {
        msg: "School created!",
        data: {
          school: schoolData
        }
      }
    } catch(error) {
      const { detail } = error.driverError
      throw new BadRequestException(detail)
    }
  }
}
