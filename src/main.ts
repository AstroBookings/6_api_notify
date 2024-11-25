import { LoggerService } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './core/config/config.type';
import { getAppConfig } from './core/config/config.util';
import { createLogger } from './core/log/log.factory';
import { buildSwaggerDocumentation } from './swagger.util';

/**
 * Bootstrap the application
 * @description This is the entry point of the application
 */
async function bootstrap() {
  const logger: LoggerService = createLogger();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger,
  });
  app.enableCors();
  buildSwaggerDocumentation(app);
  const appConfig: AppConfig = getAppConfig(app);
  logger.log(`📚 ${appConfig.host}:${appConfig.port}/docs`, 'Bootstrap');
  logger.log(`🚀 ${appConfig.host}:${appConfig.port}/api`, 'Bootstrap');
  await app.listen(appConfig.port);
}

// Main function
bootstrap();
