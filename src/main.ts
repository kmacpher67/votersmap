import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'usermap/dist'));
  // app.set(join(__dirname, '..', 'usermap/dist'));
  app.setViewEngine('vuejs');
  app.enableCors();
  await app.listen(3000);
  console.log(`smstext voters is running on: ${await app.getUrl()}`);
}
bootstrap();
