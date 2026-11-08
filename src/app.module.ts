import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module.js';
import { CommonModule } from './common/common.module.js';
import { CoreModule } from './core/core.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    CommonModule,
    CoreModule,
    ModulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
