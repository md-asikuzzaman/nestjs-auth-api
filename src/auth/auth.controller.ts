import { Body, Controller, Post } from '@nestjs/common';
import { Message } from 'src/common/decorators/message.decorator';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/users/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
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
