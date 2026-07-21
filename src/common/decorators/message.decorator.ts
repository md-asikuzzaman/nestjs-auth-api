import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE_KEY = 'message';

export const Message = (args: string) =>
  SetMetadata(RESPONSE_MESSAGE_KEY, args);
