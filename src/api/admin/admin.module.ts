import { Module } from '@nestjs/common';
import { PostgresRepository } from 'src/shared/data/postgres.repository';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

/**
 * AdminModule
 * @description Module for administrative and maintenance functions
 */
@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService, PostgresRepository],
})
export class AdminModule {}
