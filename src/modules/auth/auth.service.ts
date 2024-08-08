import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { loginDto } from './dto/login-auth.dto';
import { SqlService } from 'src/dbconfig/sql.service';
import { AuthQueries } from './auth.query';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { RefreshToken } from './dto/refresh-token-auth-dto';
import { ConfirmOtpDto, otpDto } from './dto/otp.auth.dto';
import { generateOtp, generateRefreshToken } from 'src/constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly sqlServices: SqlService,
    private readonly authQueries: AuthQueries,
    private readonly configService: ConfigService,
  ) {}

  async login(logindto: loginDto) {
    try {
      let data = {
        ...logindto,
      };
      let keys = Object.keys(data);
      let values = Object.values(data);

      const res = await this.sqlServices.run(
        this.authQueries.getUserData(values[0]),
      );

      if (res.length === 0) {
        return {
          message: 'No user Found',
          statusCode: 403,
        };
      } else {
        const result = await this.sqlServices.run(
          this.authQueries.login(values[0], values[1]),
        );
        if (result.length === 0) {
          return {
            message: 'Incorrect email or password',
            statusCode: 403,
          };
        }
        let user = result[0];

        const accessToken = jwt.sign(
          { values },
          this.configService.get<string>('SECRET_KEY'),
          { expiresIn: 3000 },
        );

        const refreshToken = await generateRefreshToken(10);

        const res1 = await this.sqlServices.run(
          this.authQueries.Usersession(user.user_id, accessToken, refreshToken),
        );
        return {
          message: 'User Logged in successfully',
          data: {
            user_id: user.user_id,
            first_name: user.first_name,
            gender: user.gender,
            user_role: user.user_role,
            email: user.email,
            phone_number: user.phone_number,
            created_at: user.created_at,
            auth_type: user.auth_type,
            value: user.value,
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          statusCode: 200,
        };
      }
    } catch (error) {
      console.log('🚀 ~ AuthService ~ login ~ error:', error);
      throw new InternalServerErrorException();
    }
  }

  async register(registerauthDto: RegisterAuthDto) {
    try {
      let { password, ...data } = registerauthDto;

      const salt = await bcrypt.genSalt();
      const hashPswd = await bcrypt.hash(password, salt);
      let keys = Object.keys(data);
      let values = Object.values(data);

      var valueuser = values.map((valueuser) => "'" + valueuser + "'");

      const result = await this.sqlServices.run(
        this.authQueries.UserRegister(keys.join(','), valueuser.join(',')),
      );

      if (result.affectedRows) {
        const user_id = result.insertId;
        const email = data.email;
        const res = this.sqlServices.run(
          this.authQueries.Passport(user_id, hashPswd, email),
        );
        console.log('🚀 ~ AuthService ~ register ~ result:', res);
      }
      return {
        message: 'User register Successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async refreshToken(refreshToken: RefreshToken) {
    try {
      let data = {
        ...refreshToken,
      };

      let key = Object.keys(refreshToken);
      let values = Object.values(refreshToken);

      const res = await this.sqlServices.run(
        this.authQueries.getRefreshToken(values[0]),
      );
      if (res.length === 0) {
        return {
          message: 'No Data Found',
          statusCode: 403,
        };
      }

      let user = res[0];
      const AccessToken = jwt.sign(
        { values },
        this.configService.get<string>('SECRET_KEY'),
        { expiresIn: 3000 },
      );
      const newRefreshToken = await generateRefreshToken(10);

      const result = this.sqlServices.run(
        this.authQueries.createRefreshToken(
          user.user_id,
          AccessToken,
          newRefreshToken,
        ),
      );

      return {
        message: 'AccessToken and refresh Token created successfully',
        statusCode: 200,
        data: {
          accessToken: AccessToken,
          refreshToken: newRefreshToken,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOtp(otpDto: otpDto) {
    const { email } = otpDto;
    const userdata = await this.sqlServices.run(
      this.authQueries.getUserData(email),
    );

    if (userdata.length === 0) {
      return {
        message: 'Invalid Email',
        statusCode: 400,
      };
    }
    let user = userdata[0];

    const otp = await generateOtp(6);
    const OptInsert = this.sqlServices.run(
      this.authQueries.createOtp(user.user_id, otp),
    );

    return {
      message: 'Otp Send to Register Email',
      statusCode: 200,
    };
  }

  async ConfimOtp(confirmtpDto: ConfirmOtpDto) {
    let data = { ...confirmtpDto };

    let keys = Object.keys(data);
    let value = Object.values(data);

    const UserData = await this.sqlServices.run(
      this.authQueries.getUserData(value[0]),
    );

    if (UserData.length === 0) {
      return {
        message: 'No user Found',
        statusCode: 403,
      };
    }

    const res = await this.sqlServices.run(
      this.authQueries.confimOtp(value[1], value[0]),
    );
    console.log('🚀 ~ AuthService ~ ConfimOtp ~ res:', res);
    if (res.length === 0) {
      return {
        message: 'Otp is Wrong',
        statusCode: 403,
      };
    }
    return {
      message: 'Otp Verified Successfully',
      statusCode: 200,
    };
  }
}
