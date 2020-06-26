import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';

import { AdminModule } from './admin/module';
import { AppModule } from './app/module';
import { ProductModule } from './product/module';

@Module({
  imports: [
    RouterModule.forRoutes([
      { path: '/admin', module: AdminModule },
      { path: '/app', module: AppModule },
      { path: '/stock', module: ProductModule }
    ]),
    AdminModule,
    AppModule,
    ProductModule
  ]
})
export class ApplicationModule {}
