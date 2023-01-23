import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { UserDto } from './dtos/user.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private UserRepo: Repository<User>
  ) {}

  signup(body: UserDto) {
    return body
  }

  login(body: UserDto) {
    return body
  }

  refreshToken() {}

  logout() {}
}
