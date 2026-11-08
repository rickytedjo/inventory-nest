import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PasswordService } from "./utils/password.service.js";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        PasswordService
    ],
    exports:[PasswordService]
})
export class CommonModule{}