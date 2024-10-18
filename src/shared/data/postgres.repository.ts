// https://node-postgres.com/
// npm install pg
// npm install --save-dev @types/pg
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

/**
 * A wrapper around the pg library to connect to a postgres database.
 * It also provides a query method to execute queries on the database.
 * @requires ConfigService for db connection details
 */
@Injectable()
export class PostgresRepository {
  readonly #logger = new Logger(PostgresRepository.name);
  readonly #client: Client;
  #connected = false;

  constructor(configService: ConfigService) {
    const dbConfig = {
      user: configService.get('DB_USER') || 'postgres',
      password: configService.get('DB_PASSWORD') || 'postgres',
      host: configService.get('DB_HOST') || 'localhost',
      port: configService.get('DB_PORT') || 5432,
      database: configService.get('DB_DB_NAME') || 'AstroBookings',
    };
    this.#client = new Client(dbConfig);
    this.#logger.verbose(`${dbConfig.user}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
  }

  // ToDo: Add a pool and call connect() at application start

  /**
   * Connects to the database.
   * @returns {Promise<void>}
   */
  async connect(): Promise<void> {
    await this.#client.connect();
    this.#connected = true;
    this.#logger.verbose(`Connected to the database ${this.#client.database}`);
  }

  /**
   * Executes a query on the database.
   * Ensures the connection is established before executing the query.
   * @param {string} query - The SQL query to execute.
   * @param {any[]} args - The arguments to pass to the query.
   * @returns {Promise<any>} - The result of the query.
   */
  async query(query: string, args?: any[]): Promise<any> {
    if (!this.#connected) {
      await this.connect();
    }
    return this.#client.query(query, args);
  }
}
