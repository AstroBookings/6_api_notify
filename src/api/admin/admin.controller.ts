import { Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminResponse } from './admin-response.dto';
import { AdminService } from './admin.service';

/**
 * Admin Controller for administrative endpoints
 */
@ApiTags('admin')
@Controller('api/admin')
// @UseGuards(AuthApiKeyGuard)
export class AdminController {
  readonly #logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {
    this.#logger.verbose('AdminController initialized');
  }

  /**
   * Regenerates the database
   *
   * 📦 Returns an object with the operation status and message
   */
  @Post('regenerate-db')
  @HttpCode(200)
  @ApiOperation({ summary: 'Regenerate the database' })
  @ApiResponse({ status: 200, description: 'Database regenerated successfully' })
  async regenerateDatabase(): Promise<AdminResponse> {
    this.#logger.verbose('Regenerating database');
    return this.adminService.regenerateDatabase();
  }

  /**
   * Test endpoint to verify the admin module functionality
   *
   * 📦 Returns an object with the operation status and message
   */
  @Post('test')
  @HttpCode(200)
  @ApiOperation({ summary: 'Test the admin module functionality' })
  @ApiResponse({ status: 200, description: 'The admin module test has been executed' })
  async adminTest(): Promise<AdminResponse> {
    this.#logger.verbose('Testing admin module');
    return this.adminService.adminTest();
  }
}
