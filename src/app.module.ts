import { AdminModule } from '@ab/api/admin/admin.module';
import { NotificationsModule } from '@ab/api/notifications/notifications.module';
import { envFilePath } from '@ab/config/config.util';
import { nonApiRoutesMiddleware } from '@ab/core/middleware/non-api-routes.middleware';
import { LogFilter } from '@ab/log/log.filter';
import { logMiddleware } from '@ab/log/log.middleware';
import { LogService } from '@ab/log/log.service';
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
const apiModules = [AdminModule, NotificationsModule];

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
    consumer.apply(nonApiRoutesMiddleware).forRoutes('*').apply(logMiddleware).forRoutes('api/*');
    new Logger('AppModule').log('AppModule configured');
  }
}
