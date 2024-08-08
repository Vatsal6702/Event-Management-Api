import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SetSwagger(app: INestApplication, path: string) {
  const config = new DocumentBuilder()
    .setTitle('Event booking mangement')
    .setDescription('event booking description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
}
