import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SetSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  let SwaggerPath = '/api/doc';
  SetSwagger(app, SwaggerPath);
  await app.listen(3000);
}
bootstrap();
