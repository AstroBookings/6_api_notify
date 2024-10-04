import { HttpStatus, Module, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { NotificationsModule } from './api/notifications/notifications.module';
import { envFilePath } from './core/config/config.util';

/**
 * Configuration options for the ConfigModule
 */
const CONFIG_OPTIONS = {
  envFilePath,
  isGlobal: true,
  cache: true,
};

/**
 * Instantiate the ConfigModule with the defined options
 */
const configModule = ConfigModule.forRoot(CONFIG_OPTIONS);

/**
 * Configuration options for the global validation pipe.
 */
export const validationPipeOptions: ValidationPipeOptions = {
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  forbidNonWhitelisted: true,
  transform: true,
};

/**
 * Array of API modules to be imported
 */
const apiModules = [NotificationsModule];

@Module({
  imports: [configModule, ...apiModules],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(validationPipeOptions),
    },
  ],
})
export class AppModule {}
