import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TeachersModule } from './teachers/teachers.module'
import { Teacher } from './teachers/teacher.entity'
import { StudentsModule } from './students/students.module'
import { Student } from './students/student.entity'
import { SchoolsModule } from './schools/schools.module'
import { School } from './schools/scholl.entity'
import { AuthModule } from './auth-todos/auth/auth.module'
import { TodosModule } from './auth-todos/todos/todos.module'
import { User } from './auth-todos/auth/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mbusellato',
      password: undefined,
      database: 'test_nest',
      entities: [Teacher, Student, School, User],
      synchronize: true,
    }),
    TeachersModule,
    StudentsModule,
    SchoolsModule,
    AuthModule,
    TodosModule,
  ],
})
export class AppModule {}
