import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogService } from './core/log/log.service';
import { buildSwaggerDocumentation } from './swagger.util';

/**
 * Bootstrap the application
 * @description This is the entry point of the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logService = app.get(LogService);
  buildSwaggerDocumentation(app);
  app.useLogger(logService);
  await app.listen(3006);
}

// Main function
bootstrap();
