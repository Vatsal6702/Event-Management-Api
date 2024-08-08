import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthQueries } from './auth.query';
import { SqlService } from 'src/dbconfig/sql.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SqlService, AuthQueries],
})
export class AuthModule {}
