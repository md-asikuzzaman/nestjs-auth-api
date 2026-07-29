import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor(private config: ConfigService) {
    this.client = createClient({
      url: this.config.get<string>('REDIS_URL'),
    });

    this.client.on('error', (err) => {
      console.error('Redis Error:', err);
    });
  }

  async onModuleInit() {
    await this.client.connect();
    console.log('Redis Connected');
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  getClient() {
    return this.client;
  }

  /** Set, get, and delete data in Redis. */

  async set(key: string, value: string, ttl?: number) {
    if (ttl) {
      await this.client.set(key, value, {
        EX: ttl,
      });
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async del(key: string): Promise<number> {
    return await this.client.del(key);
  }
}
