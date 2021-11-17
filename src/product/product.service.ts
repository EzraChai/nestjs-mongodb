import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<Product> {
    try {
      const newProduct = new this.productModel({ title, description, price });
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find({});
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    }));
  }

  async getProduct(id: string): Promise<Product> {
    let product: Product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Product with an id ${id} not found.`);
    }
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ): Promise<Product> {
    try {
      const oldProduct = await this.productModel.findById(id);

      if (title) {
        oldProduct.title = title;
      }
      if (description) {
        oldProduct.description = description;
      }
      if (price) {
        oldProduct.price = price;
      }
      return await oldProduct.save();
    } catch (error) {
      throw new NotFoundException(`Product with an id ${id} not found.`);
    }
  }

  async deleteProduct(id: string) {
    try {
      await this.productModel.findByIdAndDelete(id);
    } catch (error) {
      throw new NotFoundException(`Product with an id ${id} not found.`);
    }
    return {
      message: `Product with an Id ${id} has been deleted.`,
    };
  }
}
