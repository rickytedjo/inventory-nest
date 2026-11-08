import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { ItemModule } from './item/item.module.js';

@Module({
  imports: [AuthModule, ItemModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
