import { Body, Controller, Post } from '@nestjs/common';
import { Message } from 'src/common/decorators/message.decorator';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/users/dto/auth.dto';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
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

  @Roles('ADMIN')
  @Post('admin-only')
  adminRoute() {
    return { message: 'Welcome to the admin panel' };
  }
}
