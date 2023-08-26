import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const serviceAccount = require('../configs/private-key.json')
  app.useGlobalPipes(new ValidationPipe())
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://soliqs-web23s.appspot.com/'
  })
  await app.listen(3000);
}
bootstrap();
