import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import * as hbs from 'hbs';
import { AppModule } from './app.module';
import {UserModule} from "./user/user.module";


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  var port = process.env.PORT || 3000;
  app.useStaticAssets(join(__dirname, '..', '/public'));
  app.setBaseViewsDir(join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/template'));
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
