import { 
  Controller, 
  ClassSerializerInterceptor, 
  UseInterceptors,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserDto } from './dtos/user.dto'
import { TokensResponse } from './dtos/tokens-response.dto'
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { User } from './user.entity'

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

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request): Promise<TokensResponse> {
    const user = req.user as Partial<User>
    
    return this.authService.refreshToken(user.id, user.refresh_token)
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.user as Partial<User>

    return this.authService.logout(user.id)
  }
}
