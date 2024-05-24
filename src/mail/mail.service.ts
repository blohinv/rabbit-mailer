import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UI_DOMEN } from '../constants';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendActivationMail(email: string, link: string): Promise<unknown> {
    return await this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get<string>('SMTP_USER_NAME'),
        subject: 'Confirm registration',
        html: `
          <div>
            <h1>Use this link to activate your account</h1>
            <a href="${UI_DOMEN}/auth/activate-email/${link}">${link}</a>
          </div>
        `,
      })
      .catch((error) => {
        console.log(error);
        throw new UnprocessableEntityException(
          `Error with sending activation mail`,
        );
      });
  }

  async sendResetPasswordLink(
    email: string,
    tempToken: string,
  ): Promise<unknown> {
    return await this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get<string>('SMTP_USER_NAME'),
        subject: 'Confirm password reset',
        html: `
          <div>
            <h1>Use this link to reset password form</h1>
            <a href="${UI_DOMEN}/auth/reset-password/${tempToken}">${tempToken}</a>
          </div>
        `,
      })
      .catch((error) => {
        throw new UnprocessableEntityException(
          `Error with sending reset password mail`,
        );
      });
  }
}
