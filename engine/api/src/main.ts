import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');
  app.use(compression());


  setupSwagger(app);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT, '0.0.0.0');
  console.log(
    `Server listen on ${process.env.APP_PORT}, see ${process.env.APP_URL}:${
      process.env.APP_PORT
    }/api for see result`,
  );
}

bootstrap();
