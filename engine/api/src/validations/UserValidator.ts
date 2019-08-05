import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserValidator {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;

  description: string;

  type: string;
}

export class UserEditValidator {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  description: string;
}
