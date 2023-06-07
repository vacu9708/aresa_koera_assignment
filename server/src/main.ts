import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080', // Replace with the frontend URL
    methods: 'GET,POST,PUT,PATCH,DELETE',
    // allowedHeaders: 'Content-Type,Authorization',
  });
  await app.listen(3001);
}
bootstrap();
