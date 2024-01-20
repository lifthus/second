import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ServiceHTTPExceptionFilter } from 'src/common/exception/service/ServiceHTTPException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new ServiceHTTPExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('The Second API')
    .setDescription('The Second Swagger OpenAPI')
    .setVersion('0.1')
    .addTag('file')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  await app.listen(3000);
}
bootstrap();
