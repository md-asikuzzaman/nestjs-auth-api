import {
  IsEmail,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password!: string;
}
