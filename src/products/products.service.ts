import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CACHE_KEY } from 'src/common/constants/cache.key';
import { CACHE_TTL } from 'src/common/constants/cache.ttl';

@Injectable()
export class ProductsService {
  constructor(
    private readonly redisService: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  // create product
  async createProduct(product: CreateProductDto) {
    const createdProduct = await this.prisma.product.create({
      data: product,
    });

    // Invalidate the cache for all products
    await this.redisService.del(CACHE_KEY.ALL_PRODUCTS);

    return createdProduct;
  }

  // get all products
  async getAllProducts() {
    // Check if the products are cached in Redis
    const cachedProducts = await this.redisService.get(CACHE_KEY.ALL_PRODUCTS);
    if (cachedProducts) {
      console.log('Cache hit for all_products');
      return JSON.parse(cachedProducts);
    }

    // If not cached, fetch from the database
    const products = await this.prisma.product.findMany();

    // Cache the products in Redis for future requests
    await this.redisService.set(
      CACHE_KEY.ALL_PRODUCTS,
      JSON.stringify(products),
      CACHE_TTL.ONE_HOUR,
    );

    console.log('Cache miss for all_products, fetched from DB and cached');

    return products;
  }

  // delete product by id
  async deleteProduct(id: string) {
    const deletedProduct = await this.prisma.product.delete({
      where: { id: id },
    });

    // Invalidate the cache for all products
    await this.redisService.del(CACHE_KEY.ALL_PRODUCTS);

    return deletedProduct;
  }

  // update product by id

  async updateProduct(id: string, product: CreateProductDto) {
    const updatedProduct = await this.prisma.product.update({
      where: { id: id },
      data: product,
    });

    // Invalidate the cache for all products
    await this.redisService.del(CACHE_KEY.ALL_PRODUCTS);

    return updatedProduct;
  }
}
