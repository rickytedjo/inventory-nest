import { ConfigService } from "@nestjs/config";
import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AuthDto } from "../dto/auth.dto.js";
import { PrismaService } from "../../../core/database/prisma.service.js";
import { PasswordService } from '../../../common/utils/password.service.js';
import { db } from '../../../prisma/db.js';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

@Injectable()
export class AuthService{
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService,
        private config: ConfigService,
        private readonly passwordService: PasswordService
    ){}


    async signIn(dto:AuthDto) {
        const data = await db.orm.public.User.first({
                email:dto.email
        });
        if(data && await this.passwordService.comparePassword(dto.password, data.password)){
            return {
                data
            };
        }
        throw new NotFoundException("User not found or invalid credentials");
    }
    
    async signUp(dto:AuthDto){
        try{
            const hashedPassword = await this.passwordService.hashPassword(dto.password);
            const data: any = { ...dto, password: hashedPassword };
            return await db.orm.public.User.create(data);
        } catch(err){
            if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
              throw new ConflictException('Email already registered');
            }
            throw err;
        }
    }
}