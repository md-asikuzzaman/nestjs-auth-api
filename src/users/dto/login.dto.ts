import { IsEmail, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password!: string;
}
