import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config.type';

// Install npm i @nestjs/config

/**
 * Determines the environment file path based on the current NODE_ENV.
 */
export const envFilePath = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';

/**
 * Retrieves the application configuration from the ConfigService.
 *
 * @param app - The NestJS application instance.
 * @returns The application configuration object.
 */
export function getAppConfig(app: INestApplication): AppConfig {
  const configService = app.get(ConfigService);
  return {
    host: configService.get<string>('APP_HOST') || 'localhost',
    port: configService.get<number>('APP_PORT') || 3000,
    appName: configService.get<string>('APP_NAME') || 'API',
    appTitle: configService.get<string>('APP_TITLE') || 'A.P.I.',
    appDescription: configService.get<string>('APP_DESCRIPTION') || 'The API.',
  };
}
