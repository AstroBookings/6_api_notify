// Start Generation Here
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { PostgresRepository } from './postgres.repository';

/**
 * Provider for the PostgresRepository
 * Uses the Pool class from the pg package to create a connection pool
 * @requires ConfigService to get the database configuration
 * @returns {Pool} - A connection pool
 */
const dbProvider = {
  provide: PostgresRepository,
  useFactory: (configService: ConfigService) => {
    const pgPoolConfig = {
      user: configService.get('DB_USER') || 'postgres',
      password: configService.get('DB_PASSWORD') || 'postgres',
      host: configService.get('DB_HOST') || 'localhost',
      port: configService.get('DB_PORT') || 5432,
      database: configService.get('DB_DB_NAME') || 'AstroBookings',
    };
    return new Pool(pgPoolConfig);
  },
  inject: [ConfigService],
};

/**
 * Module to provide and export the PostgresRepository
 */
@Module({
  imports: [ConfigModule],
  providers: [dbProvider],
  exports: [PostgresRepository],
})
export class PostgresModule {}
