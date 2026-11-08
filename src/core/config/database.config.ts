import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from "../../common/types/env.type.js";

export default registerAs<DatabaseConfig>('database', () => ({
  url: process.env.DATABASE_URL || '', 
  pool_mode: process.env.DB_POOL_MODE || 'transaction', 
}));