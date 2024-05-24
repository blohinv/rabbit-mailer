import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { MAIL_SERVICE } from './mail/di-tokens.constant';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    MailModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: MAIL_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.URL],
          queue: process.env.QUEUE,
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
