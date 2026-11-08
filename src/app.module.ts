import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module.js';
import { CommonModule } from './common/common.module.js';
import { CoreModule } from './core/core.module.js';
import { AppController } from './app.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    CommonModule,
    CoreModule,
    ModulesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
