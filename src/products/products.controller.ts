import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Public()
  @Post('create')
  async createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }
}
