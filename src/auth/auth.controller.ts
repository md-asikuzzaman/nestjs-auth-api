import { Controller, Post } from '@nestjs/common';
import { Message } from 'src/common/decorators/message.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login() {
    return { msg: 'This is the login route' };
  }

  @Post('register')
  register() {
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
