import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { loginDto } from './dto/login-auth.dto';
import { Auth } from './entities/auth.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { RefreshToken } from './dto/refresh-token-auth-dto';
import { ConfirmOtpDto, otpDto } from './dto/otp.auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    type: Auth,
    description: 'User Logged in successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 403,
    description: 'Incorrect Data',
  })
  create(@Body() logindto: loginDto) {
    return this.authService.login(logindto);
  }

  @Post('register')
  @ApiResponse({
    status: 200,
    type: Auth,
    description: 'User Register in successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 403,
    description: 'Incorrect Data',
  })
  Register(@Body() registerdto: RegisterAuthDto) {
    return this.authService.register(registerdto);
  }

  @Post('refreshToken')
  @ApiResponse({
    status: 200,
    type: Auth,
    description: 'User Register in successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 403,
    description: 'Incorrect Data',
  })
  RefreshToken(@Body() refreshToken: RefreshToken) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('forgot-password')
  @ApiResponse({
    status: 200,
    type: Auth,
    description: 'Otp sent to email',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 403,
    description: 'Incorrect Data',
  })
  Otp(@Body() otpDto: otpDto) {
    return this.authService.getOtp(otpDto);
  }

  @Post('confirm-otp')
  @ApiResponse({
    status: 200,
    type: Auth,
    description: 'Successfully Match Otp',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 403,
    description: 'Incorrect Data',
  })
  ConfirmOtp(@Body() confirmtpDto: ConfirmOtpDto) {
    return this.authService.ConfimOtp(confirmtpDto);
  }
}
