import { Module } from '@nestjs/common'
import { TeachersController } from './teachers.controller'
import { TeachersService } from './teachers.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Teacher } from './teacher.entity'
import { SchoolsModule } from 'src/schools/schools.module' 
import { School } from 'src/schools/scholl.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Teacher, 
      School
    ]),
    SchoolsModule
  ],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
