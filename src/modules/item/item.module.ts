import { Module } from '@nestjs/common';
import { ItemController } from './controller/item.controller.js';
import { ItemService } from './service/item.service.js';
import { CategoryService } from './service/category.service.js';
import { CategoryController } from './controller/category.controller.js';

@Module({
  imports: [],
  controllers: [ItemController, CategoryController],
  providers: [ItemService, CategoryService],
})
export class ItemModule {}
