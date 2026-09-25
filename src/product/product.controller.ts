import { Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct() {
    return this.productService.createProduct();
  }

  @Get()
  getAll() {
    return this.productService.getAllProducts();
  }
}
