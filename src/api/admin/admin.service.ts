import { Injectable, Logger } from '@nestjs/common';
import { PostgresRepository } from 'src/shared/data/postgres.repository';
import { AdminResponse } from './admin-response.dto';
import { SQL_SCRIPTS } from './admin.config';

/**
 * AdminService
 * @description Service for administrative operations
 */
@Injectable()
export class AdminService {
  readonly #logger = new Logger(AdminService.name);
  readonly #connection = this.postgresRepository;

  constructor(private readonly postgresRepository: PostgresRepository) {
    this.#logger.verbose('Initialized');
  }

  /**
   * Regenerates the database by executing SQL scripts
   * @returns Object with the operation status and message
   */
  async regenerateDatabase(): Promise<AdminResponse> {
    try {
      await this.#executeDatabaseScripts();
      return { status: 'success', message: 'Database regenerated successfully' };
    } catch (error) {
      return this.#handleDatabaseError(error);
    }
  }

  /**
   * Test method to verify the service functionality
   * @returns Object with the operation status and message
   */
  async adminTest(): Promise<AdminResponse> {
    return { status: 'success', message: 'Admin test endpoint is working correctly' };
  }

  async #executeDatabaseScripts(): Promise<void> {
    await this.#connection.query(SQL_SCRIPTS.CLEAR_DATABASE);
    this.#logger.verbose('Database cleared');
    await this.#connection.query(SQL_SCRIPTS.CREATE_DATABASE);
    this.#logger.verbose('Database created');
    await this.#connection.query(SQL_SCRIPTS.SEED_DATABASE);
    this.#logger.verbose('Database seeded');
  }

  // Removed private method #createSuccessResponse as per instructions

  #handleDatabaseError(error: Error): AdminResponse {
    this.#logger.debug('Error regenerating database', error.stack);
    throw new Error('Failed to regenerate database');
  }
}