import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  });
  const configAPIPage = new DocumentBuilder()
    .setTitle("Pawnshop")
    .setDescription("This api for pawnshop")
    .setVersion("1.0")
    .addTag("API")
    .build()

  const document = SwaggerModule.createDocument(app, configAPIPage);
  SwaggerModule.setup('api', app, document)

  app.use(cookieParser());

  const config = app.get(ConfigService);
  const port = config.get("server_port")

  await app.listen(port);
}
bootstrap();
