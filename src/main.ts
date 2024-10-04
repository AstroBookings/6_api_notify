import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { buildSwaggerDocumentation } from './swagger.util';

/**
 * Bootstrap the application
 * @description This is the entry point of the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  buildSwaggerDocumentation(app);
  await app.listen(3006);
}

// Main function
bootstrap();
