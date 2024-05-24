import { MailerOptions } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from '@nestjs/config';

export const getMailConfig = (): MailerOptions => {
  const configService = new ConfigService();
  const mailFromName = configService.get<string>('SMTP_USER_NAME');
  const mailFromAddress = configService.get<string>('SMTP_USER_NAME');

  return {
    transport: {
      host: configService.get<string>('SMTP_HOST'),
      port: configService.get<string>('SMTP_PORT'),
      ignoreTLS: true,
      secure: true,
      auth: {
        user: configService.get<string>('SMTP_USER_NAME'),
        pass: configService.get<string>('SMTP_USER_PASSWORD'),
      },
      defaults: {
        from: `"${mailFromName}" <${mailFromAddress}>`,
      },
      preview: true,
      template: {
        dir: process.cwd() + '/template/',
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    },
  };
};
