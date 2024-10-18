import { PostgresRepository } from '@ab/data/postgres.repository';
import { Injectable, Logger } from '@nestjs/common';
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
  async regenerateDatabase(): Promise<string> {
    await this.#executeDatabaseScripts();
    return 'Database regenerated successfully';
  }

  /**
   * Test method to verify the service availability
   * @returns Success pong response
   */
  async pong(): Promise<string> {
    return 'pong';
  }

  async #executeDatabaseScripts(): Promise<void> {
    try {
      await this.#connection.query(SQL_SCRIPTS.CLEAR_DATABASE);
      this.#logger.verbose('Database cleared');
    } catch (error) {
      this.#logger.verbose('Error clearing database', SQL_SCRIPTS.CLEAR_DATABASE);
      throw new Error('Failed to clear database');
    }
    try {
      await this.#connection.query(SQL_SCRIPTS.CREATE_DATABASE);
      this.#logger.verbose('Database created');
    } catch (error) {
      this.#logger.error('Error creating database', SQL_SCRIPTS.CREATE_DATABASE);
      throw new Error('Failed to create database');
    }
    try {
      await this.#connection.query(SQL_SCRIPTS.SEED_DATABASE);
      this.#logger.verbose('Database seeded');
    } catch (error) {
      this.#logger.verbose('Error seeding database', SQL_SCRIPTS.SEED_DATABASE);
      throw new Error('Failed to seed database');
    }
  }
}
