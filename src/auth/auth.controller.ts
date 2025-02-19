import { Body, Controller, Get, Patch, Post, Request } from '@nestjs/common';
import { Public } from '../infra/security/decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RequestWithUser } from '../infra/security/interfaces/request-with-user.interface';
import { TokenFMC } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.signIn(body.username, body.password);
  }

  @Get('/profile')
  getProfile(@Request() { user }: RequestWithUser) {
    return {
      username: user.username,
      role: user.role,
    };
  }

  @Patch('/token')
  async setToken(@Request() { user }: RequestWithUser, @Body() body: TokenFMC) {
    console.log('token: ', body.tokenFMC);
    return this.authService.setUserToken(user.sub, body.tokenFMC);
  }
}
