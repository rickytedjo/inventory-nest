export interface AppConfig {
  name: string;
  env: 'development' | 'production' | 'test';
  port: number;
  apiPrefix: string;
  debug: boolean;
  timezone: string;
}

export interface DatabaseConfig {
  url: string;
  pool_mode: string;
}

export interface SecurityConfig {
  session: {
    origins: string[];
    methods: string[];
    allowedHeaders: string[];
  };
}
