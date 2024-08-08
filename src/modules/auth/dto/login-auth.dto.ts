import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { isString } from 'lodash';

export class loginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'test123@gmail.com',
    description: 'the mail for login',
  })
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Password is too short.',
  })
  @ApiProperty({
    example: '1234567',
    description: 'the password for login',
  })
  password: string;
}
