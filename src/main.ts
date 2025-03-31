import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'reflect-metadata';

import { AllExceptionsFilter } from 'common/filters/all-exceptions.filters';
import { CustomExceptionFilter } from 'common/filters/custom-exceptions.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true,
      exceptionFactory: (errors) => {
        console.log(errors);
        return new BadRequestException('Validation failed');
      },
    }),
  );

  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
