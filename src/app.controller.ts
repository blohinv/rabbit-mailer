import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
  constructor(private mailService: MailService) {}

  @MessagePattern({ cmd: 'activate_account' })
  sendMail(@Payload() dataGot: string): Promise<unknown> {
    const data = JSON.parse(dataGot);
    return this.mailService.sendActivationMail(data.email, data.link);
  }

  @MessagePattern({ cmd: 'reset_code' })
  resetCode(@Payload() dataGot: string): Promise<unknown> {
    const data = JSON.parse(dataGot);
    return this.mailService.sendResetPasswordLink(data.email, data.tempToken);
  }
}
