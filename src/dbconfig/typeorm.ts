import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Vatsal@21',
      database: 'ebook',
      synchronize: false,
      logging: false,
      autoLoadEntities: false,
      multipleStatements: true,
      bigNumberStrings: false,
    };
  }
}

export const TypeOrmAsyncOptions: TypeOrmModuleAsyncOptions = {
  imports: [],
  inject: [],
  useFactory: (): TypeOrmModuleOptions => {
    return TypeOrmConfig.getOrmConfig();
  },
};
