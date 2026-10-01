import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({ origin: true, credentials: true });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Vantage NestJS Server running on port ${port}`);
}
bootstrap();
