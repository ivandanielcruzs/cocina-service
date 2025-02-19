import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Username not provider properly' })
  username: string;

  @MinLength(6, { message: 'Password not provider properly' })
  password: string;
}
