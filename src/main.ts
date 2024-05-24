import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

class APIDocument {
  static setup(app: INestApplication) {
    const options = new DocumentBuilder().setTitle('CBDC-Blockchain-Backend').setDescription('This application exposes the backend APIs for the CBDC implemented APP').build();
    const document = SwaggerModule.createDocument(app, options, { ignoreGlobalPrefix: true })
    SwaggerModule.setup('API', app, document);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  APIDocument.setup(app);
  await app.listen(3000);
}

bootstrap();
