import { Controller, Get, HttpCode, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

/**
 * Admin Controller for administrative endpoints
 */
@Controller('api/admin')
@ApiTags('admin')
// @UseGuards(AuthApiKeyGuard)
export class AdminController {
  readonly #logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {
    this.#logger.verbose('AdminController initialized');
  }

  @Get('ping')
  @ApiOperation({ summary: 'Ping the admin endpoint' })
  @ApiResponse({ status: 200, description: 'Returns pong' })
  async ping(): Promise<string> {
    return this.adminService.pong();
  }

  @Get('regenerate-db')
  @Post('regenerate-db')
  @HttpCode(200)
  @ApiOperation({ summary: 'Regenerate the database', description: 'Use before starting tests' })
  @ApiResponse({ status: 200, description: 'Database regenerated successfully' })
  async regenerateDatabase(): Promise<string> {
    this.#logger.verbose('Regenerating database');
    return this.adminService.regenerateDatabase();
  }
}
