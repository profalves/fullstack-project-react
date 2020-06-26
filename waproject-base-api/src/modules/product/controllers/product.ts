import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { enRoles } from 'modules/database/interfaces/user';
import { Product } from 'modules/database/models/product';

import { ProductRepository } from '../repositories/product';
import { ProductService } from '../services/product';
import { ListValidator } from '../validators/product/list';
import { SaveValidator } from '../validators/product/save';

@ApiTags('Stock: Stock')
@Controller('/product')
@AuthRequired([enRoles.user])
export class ProductController {
  constructor(private productRepository: ProductRepository, private productService: ProductService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  public async list(@Query() model: ListValidator) {
    return this.productRepository.list(model);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Product })
  public async details(@Param('id', ParseIntPipe) id: number) {
    return this.productRepository.findById(id);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }

  @Post('save')
  @ApiResponse({ status: 200, type: Product })
  public async save(@Body() model: SaveValidator) {
    return this.productService.save(model);
  }
}
