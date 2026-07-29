import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { RedisService } from 'src/redis/redis.service';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly redisService: RedisService,
  ) {}

  @Public()
  @Get()
  async getAllProducts() {
    await this.redisService.del('name'); // Set with TTL of 60 seconds

    await this.redisService.set('name', 'naeem', 60); // Set with TTL of 60 seconds

    const cachedName = await this.redisService.get('name');

    return { msg: 'This is a public route', cachedName };
  }
}
