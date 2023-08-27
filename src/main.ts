import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Add this line
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  await app.listen(process.env.PORT || 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
