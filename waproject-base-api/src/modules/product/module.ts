import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { ProductController } from './controllers/product';
import { DefaultMiddleware } from './middlewares/defaultMiddleware';
import { ProductRepository } from './repositories/product';
import { ProductService } from './services/product';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService]
})
export class ProductModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(DefaultMiddleware).forRoutes('*');
  }
}
