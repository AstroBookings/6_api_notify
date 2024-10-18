import { PostgresModule } from '@ab/shared/data/postgres.module';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

/**
 * AdminModule
 * @description Module for administrative and maintenance functions
 */
@Module({
  imports: [PostgresModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
