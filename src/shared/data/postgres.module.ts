// Start Generation Here
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresRepository } from './postgres.repository';

/**
 * Module to provide and export the PostgresRepository
 */
@Module({
  imports: [ConfigModule],
  providers: [PostgresRepository],
  exports: [PostgresRepository],
})
export class PostgresModule {}
