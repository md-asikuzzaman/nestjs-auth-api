import { Controller, Post } from '@nestjs/common';
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
  refreshToken() {
    return { msg: 'This is the refresh token route' };
  }
}
