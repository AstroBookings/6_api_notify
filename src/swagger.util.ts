import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getAppConfig } from './core/config/config.util';

/**
 * Builds and sets up Swagger(OpenAPI) documentation for the application.
 *
 * @param app - The NestJS application instance.
 */
export const buildSwaggerDocumentation = (app: INestApplication) => {
  const appConfig = getAppConfig(app);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(appConfig.appTitle)
    .setDescription(appConfig.appDescription)
    .addTag('notifications', 'API for managing notifications')
    .addTag('admin', 'API for managing the admin')
    .build();

  const openApiDocument = SwaggerModule.createDocument(app, config);
  const path = 'docs';
  SwaggerModule.setup(path, app, openApiDocument);
};
