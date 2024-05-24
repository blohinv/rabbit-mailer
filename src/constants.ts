import { ConfigService } from '@nestjs/config';

const generateUiDomen = () => {
  const configService = new ConfigService();

  const PROTOCOL = configService.get<string>('PROTOCOL');
  const HOST = configService.get<string>('HOST');
  const PORT = configService.get<string>('PORT');

  return `${PROTOCOL}://${HOST}:${PORT}`;
};

export const UI_DOMEN = generateUiDomen();
