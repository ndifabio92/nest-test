import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsConfig } from './config/app.config';

export async function bootstrap() {
  const environment = process.env.NODE_ENV || 'development';

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api');
  app.enableCors(corsConfig[environment]);
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
