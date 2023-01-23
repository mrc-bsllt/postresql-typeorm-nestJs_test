import { 
  BadRequestException, 
  Injectable, 
  InternalServerErrorException, 
  UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { UserDto } from './dtos/user.dto'
import { TokensResponse } from './dtos/tokens-response.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private UserRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signup(body: UserDto): Promise<TokensResponse> {
    const { email, password } = body

    try {
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = this.UserRepo.create({
        email,
        password: hashedPassword
      })
      await this.UserRepo.save(user)

      const tokens = await this.getTokens(user.id, user.email)
      await this.updateRefreshToken(user.id, tokens.refreshToken)

      return tokens
    } catch(error) {
      console.log(error)
      throw new BadRequestException()
    }
  }

  async login(body: UserDto): Promise<TokensResponse> {
    const { email, password } = body

    try {
      const user = await this.UserRepo.findOneOrFail({ 
        where: {
          email
        }
      })

      const passwordMatches = await bcrypt.compare(password, user.password)
      if(!passwordMatches) throw new UnauthorizedException()

      const tokens = await this.getTokens(user.id, user.email)
      await this.updateRefreshToken(user.id, tokens.refreshToken)

      return tokens
    } catch(error) {
      console.log(error)
      throw new UnauthorizedException()
    }
  }

  refreshToken() {}

  logout() {}

  // JWT HELPER FUNCTIONS ------------------------
  async getTokens(userId: number, email: string): Promise<TokensResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          email
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15 // 15 minuti
        }
      ),
      this.jwtService.signAsync(
        {
          userId,
          email
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7 // 1 settimana
        }
      )
    ])

    return {
      accessToken,
      refreshToken
    }
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    try {
      const hashedRt = await bcrypt.hash(refreshToken, 12)
      await this.UserRepo
        .createQueryBuilder()
        .update(User)
        .set({ refresh_token: hashedRt })
        .where("id = :userId", { userId })
        .execute()
    } catch(error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }
}
