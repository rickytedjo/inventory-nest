import { Body, Controller, Get, Post, Render, Req, Res, Session } from "@nestjs/common";
import { AuthService } from "../service/auth.service.js";
import { AuthDto, RegDto } from "../dto/auth.dto.js";
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    // View Endpoints
    @Get('login') @Render('auth/login')
    login() { return { title: 'Login' }; }


    // API Endpoint
    
    @Post('signin')
    async signin(
        @Body() dto: AuthDto,
        @Req() req: Request,
        @Res() res: Response
    ){
        const data = await this.authService.signIn(dto);

        if (!data) {
          return {
            statusCode: 409,
            message: 'Invalid username or password',
          };
        }

        req.session.userId = data.data.id;
        req.session.isAuthenticated = true;

        return res.redirect('/category');   
    }

    @Post('signup')
    async signup(
        @Body() dto: RegDto){
        const data = await this.authService.signUp(dto);
        if (!data.id) {
            return { statusCode: 409, message: 'User already exists' };
        }
        return {
            statusCode: 201,
            message: 'User registered successfully',
        }
    }

    @Post('logout')
    logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
    });
  }
}