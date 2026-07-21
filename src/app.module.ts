import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ResponseInterceptor,
    },

    // {
    //   provide: 'APP_PIPE',
    //   useClass: ValidationPipe,
    //   useValue: new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //     transform: true,
    //   }),
    // },
  ],
})
export class AppModule {}
