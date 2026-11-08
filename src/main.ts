import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import type { NextFunction, Request, Response } from 'express';
import { PrismaExceptionFilter } from './common/filter/prisma.filter.js';
import { DbExceptionFilter } from './common/filter/db.filter.js';
import hbs from 'hbs';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use((req: Request, res: Response, next: NextFunction) => { res.locals.error = req.query.error; next(); });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true,
      forbidNonWhitelisted: true
    }),
  );

  app.useGlobalFilters(new PrismaExceptionFilter(), new DbExceptionFilter());
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'DefaultSecretKey',
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useStaticAssets(join(import.meta.dirname, '..', 'public'));
  app.setBaseViewsDir(join(import.meta.dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbs.registerHelper('eq', (a: unknown, b: unknown) => String(a) === String(b));

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
