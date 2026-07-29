import {
  Injectable,
  Logger,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(
    RedisService.name,
  );

  private readonly client?: Redis;


  constructor(
    private readonly config: ConfigService,
  ) {
    const redisUrl =
      this.config.get<string>('REDIS_URL');


    if (!redisUrl) {
      this.logger.warn(
        'REDIS_URL missing. Redis disabled.',
      );

      return;
    }


    this.client = new Redis(redisUrl, {

      // reconnect automatically
      retryStrategy: (times) => {

        const delay = Math.min(
          times * 1000,
          10000,
        );


        this.logger.warn(
          `Redis reconnecting in ${delay}ms`,
        );


        return delay;
      },


      // Do not block requests when Redis is down
      enableOfflineQueue: false,


      connectTimeout: 5000,

    });



    this.client.on(
      'connect',
      () => {
        this.logger.log(
          'Redis connecting...',
        );
      },
    );


    this.client.on(
      'ready',
      () => {
        this.logger.log(
          'Redis ready',
        );
      },
    );


    this.client.on(
      'reconnecting',
      () => {
        this.logger.warn(
          'Redis reconnecting...',
        );
      },
    );


    this.client.on(
      'error',
      (error) => {
        this.logger.warn(
          `Redis error: ${error.message}`,
        );
      },
    );


    this.client.on(
      'close',
      () => {
        this.logger.warn(
          'Redis connection closed',
        );
      },
    );
  }



  async get(
    key: string,
  ): Promise<string | null> {

    if (!this.client) {
      return null;
    }


    try {

      return await this.client.get(key);

    } catch {

      return null;

    }
  }



  async set(
    key: string,
    value: string,
    ttl?: number,
  ): Promise<void> {

    if (!this.client) {
      return;
    }


    try {

      if (ttl) {

        await this.client.set(
          key,
          value,
          'EX',
          ttl,
        );

      } else {

        await this.client.set(
          key,
          value,
        );

      }


    } catch {

      // cache failure ignored

    }
  }



  async del(
    key: string,
  ): Promise<void> {

    if (!this.client) {
      return;
    }


    try {

      await this.client.del(key);

    } catch {

    }
  }



  async onModuleDestroy() {

    if (this.client) {

      await this.client.quit();

    }
  }
}