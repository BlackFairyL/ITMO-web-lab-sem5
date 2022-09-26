import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  var port = 3000
  app.useStaticAssets(join(__dirname, '..', '/public'));
  app.setBaseViewsDir(join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/template'));
  await app.listen(port);
}
bootstrap();
