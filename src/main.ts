import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { MAIL_SERVICE } from './mail/di-tokens.constant';

export const start = async () => {
  const app = await NestFactory.createMicroservice(AppModule, {
    name: MAIL_SERVICE,
    transport: Transport.RMQ,
    options: {
      urls: [process.env.URL],
      queue: process.env.QUEUE,
    },
  });

  await app.listen();
};

start();
