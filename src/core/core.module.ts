import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./database/prisma.module.js";

@Global()
@Module({
    imports: [
        ConfigModule,
        PrismaModule
    ]
})
export class CoreModule{}