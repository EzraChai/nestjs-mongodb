import { ProductService } from './product.service';
import { Product } from './product.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }

  @Get('/:id')
  async getProduct(@Param('id') prodId: string): Promise<Product> {
    return await this.productService.getProduct(prodId);
  }

  @Post()
  async createNewProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<Product> {
    return await this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<Product> {
    return await this.productService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  @Delete('/:id')
  async deleteProduct(
    @Param('id') prodId: string,
  ): Promise<{ message: string }> {
    return await this.productService.deleteProduct(prodId);
  }
}
