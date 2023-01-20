import { 
  Controller,
  Post,
  Body,
} from '@nestjs/common'
import { SchoolsService } from './schools.service'
import { CreateSchollDto } from './dtos/create-scholl.dto'

@Controller('schools')
export class SchoolsController {
  constructor(private schoolsService: SchoolsService) {}

  @Post()
  createSchool(@Body() body: CreateSchollDto) {
    return this.schoolsService.createSchool(body)
  }
}
