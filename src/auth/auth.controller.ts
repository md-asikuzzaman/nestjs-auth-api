import { Body, Controller, Post } from '@nestjs/common';
import { Message } from 'src/common/decorators/message.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login.dto';
import { RegisterDto } from 'src/users/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return { msg: 'This is the login route' };
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return { msg: 'This is the register route' };
  }

  @Post('logout')
  logout() {
    return { msg: 'This is the logout route' };
  }

  @Post('refresh')
  @Message('Token refreshed successfully')
  refreshToken() {
    return { msg: 'This is the refresh token route' };
  }
}
