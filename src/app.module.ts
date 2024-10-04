import {
  HttpStatus,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { NotificationsModule } from './api/notifications/notifications.module';
import { envFilePath } from './core/config/config.util';
import { LogFilter } from './core/log/log.filter';
import { logMiddleware } from './core/log/log.middleware';
import { LogService } from './core/log/log.service';

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
    LogService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(validationPipeOptions),
    },
    {
      provide: APP_FILTER,
      useClass: LogFilter,
    },
  ],
})
export class AppModule implements NestModule {
  /**
   * Configure global middleware
   * @param consumer - The MiddlewareConsumer to apply middleware
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logMiddleware).forRoutes('*');
    new Logger('AppModule').log('AppModule configured');
  }
}
