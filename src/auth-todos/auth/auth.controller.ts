import { 
  Controller, 
  ClassSerializerInterceptor, 
  UseInterceptors,
  Post,
  Body,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserDto } from './dtos/user.dto'
import { TokensResponse } from './dtos/tokens-response.dto'

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() body: UserDto): Promise<TokensResponse> {
    return this.authService.signup(body)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: UserDto): Promise<TokensResponse> {
    return this.authService.login(body)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  refreshToken() {
    return this.authService.refreshToken()
  }
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  logout() {
    return this.authService.logout()
  }
}
