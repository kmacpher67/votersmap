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
  //app.useStaticAssets(join(__dirname, '..', 'views'))

  app.setBaseViewsDir(join(__dirname, '..', 'usermap/dist'));
  // app.setBaseViewsDir('views');
  // app.set(join(__dirname, '..', 'usermap/dist'));

  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  };

  app.setViewEngine('ejs');  // ejs or jade or hbs 
  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
  });

  await app.listen(3000);
  console.log(`smstext voters is running on: ${await app.getUrl()}`);
}
bootstrap();
