import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(e: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();

    const map: Record<string, [number, string]> = {
      P2025: [HttpStatus.NOT_FOUND, 'Resource not found'],
      P2002: [HttpStatus.CONFLICT, 'Unique constraint violated'],
      P2003: [HttpStatus.CONFLICT, 'Resource is still referenced'],
    };

    const [statusCode, message] = map[e.code] ?? [
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error',
    ];

    res.status(statusCode).json({ statusCode, message });
  }
}