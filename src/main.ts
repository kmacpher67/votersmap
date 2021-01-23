import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // For serving static files you have to use useStaticAssets() instead of setBaseViewsDir():
  console.log('main.ts - bootstrap function');
  // app.useStaticAssets(join(__dirname, '..', 'usermap/dist'))
  // app.useStaticAssets(join(__dirname, '..', 'votemapper'))

  app.setBaseViewsDir(join(__dirname, '..', 'usermap/dist'));
  app.setBaseViewsDir('..');
  // app.set(join(__dirname, '..', 'usermap/dist'));
  app.setViewEngine('html');  // ejs or jade or html 
  app.enableCors();

  await app.listen(3000);
  console.log(`smstext voters is running on: ${await app.getUrl()}`);
}
bootstrap();
