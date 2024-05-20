import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService);
  const port = config.get("port")

  const configAPIPage = new DocumentBuilder()
    .setTitle("Pawnshop")
    .setDescription("This api for pawnshop")
    .setVersion("1.0")
    .addTag("API")
    .build()

  const document = SwaggerModule.createDocument(app, configAPIPage);
  SwaggerModule.setup('api', app, document)

  await app.listen(port);
}
bootstrap();
