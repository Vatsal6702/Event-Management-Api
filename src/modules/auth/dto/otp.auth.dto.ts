import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { isString } from 'lodash';

export class otpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'test123@yopmail.com',
    description: 'the mail for otp',
  })
  email: string;
}

export class ConfirmOtpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'test123@yopmail.com',
    description: 'the mail for otp',
  })
  email: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '123456',
    description: 'the otp',
  })
  otp: number;
}
