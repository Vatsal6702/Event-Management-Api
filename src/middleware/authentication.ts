// import {
//   HttpException,
//   HttpStatus,
//   NestMiddleware,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import * as jwt from 'jsonwebtoken';

// export class AuthMiddleware implements NestMiddleware {
//   constructor(private readonly configServices: ConfigService) {}
//   async use(req: any, res: any, next: (error?: any) => void) {
//     if (req?.headers?.authorization?.length > 0) {
//       try {
//         let accessToken = req.headers.authorization.split(' ')[1];

//         jwt.verify(
//           accessToken,
//           this.configServices.get<string>('SECRET_KEY'),
//           (err: Error) => {
//             if (err) {
//               throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
//             }
//             next();
//           },
//         );
//       } catch (error) {
//         console.log('🚀 ~ AuthMiddleware ~ use ~ error:', error);
//         throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
//       }
//     } else {
//       throw new HttpException(
//         'Authentication required',
//         HttpStatus.UNAUTHORIZED,
//       );
//     }
//   }
// }

import {
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req?.headers?.authorization?.length > 0) {
      try {
        let accessToken = req.headers.authorization.split(' ')[1];

        jwt.verify(
          accessToken,
          this.configService.get<string>('SECRET_KEY'),
          (err: Error) => {
            if (err) {
              throw new HttpException(
                {
                  message: 'Invalid Token',
                },
                401,
              );
            }
            next();
          },
        );
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException(
        'Authentication required',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
