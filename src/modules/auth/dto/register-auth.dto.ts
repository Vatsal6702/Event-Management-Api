import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'test',
    description: 'Name for app',
  })
  first_name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'male',
    description: 'Gender',
  })
  gender: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Audiance',
    description: 'role',
  })
  user_role: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'test123@test.com',
    description: 'Email for user',
  })
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '9785658545',
    description: 'Phone number for app',
  })
  phone_number: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 0,
    description: 'status for app',
  })
  status: number;
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'password is to short',
  })
  @ApiProperty({
    example: '1234567',
    description: 'Password for app',
  })
  password: string;
}
