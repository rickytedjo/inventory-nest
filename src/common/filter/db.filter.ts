import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";

@Catch()
export class DbExceptionFilter implements ExceptionFilter {

  catch(e: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    const code = e?.code ?? e?.cause?.code;

    const map: Record<string, [number, string]> = {
      // Prisma
      P2025: [HttpStatus.NOT_FOUND, 'Resource not found'],
      P2002: [HttpStatus.CONFLICT, 'Unique constraint violated'],
      P2003: [HttpStatus.CONFLICT, 'Resource is still referenced'],
      // Postgres
      '23505': [HttpStatus.CONFLICT, 'Unique constraint violated'],
      '23503': [HttpStatus.CONFLICT, 'Related record conflict'],
      '23502': [HttpStatus.BAD_REQUEST, 'A required field is missing'],
      '22P02': [HttpStatus.BAD_REQUEST, 'Invalid value provided'],
    };

    const hit = map[code];
    if (!hit) throw e; // let Nest's default handling deal with it

    const [statusCode, message] = hit;
    res.status(statusCode).json({ statusCode, message });
  }
}