import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshToken {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123456789',
    description: 'The refresh token to genrate new accesstoken',
  })
  refreshToken: string;
}
