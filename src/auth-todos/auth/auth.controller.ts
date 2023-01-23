import { 
  Controller, 
  ClassSerializerInterceptor, 
  UseInterceptors,
  Post,
  Body
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserDto } from './dtos/user.dto'
import { TokensResponse } from './dtos/tokens-response.dto'

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: UserDto): Promise<TokensResponse> {
    return this.authService.signup(body)
  }

  @Post('login')
  login(@Body() body: UserDto) {
    return this.authService.login(body)
  }

  refreshToken() {
    return this.authService.refreshToken()
  }

  logout() {
    return this.authService.logout()
  }
}
