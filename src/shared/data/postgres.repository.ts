// https://node-postgres.com/
// npm install pg
// npm install --save-dev @types/pg
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class PostgresRepository {
  readonly #logger = new Logger(PostgresRepository.name);
  #connected = false;
  private readonly client: Client;

  constructor(configService: ConfigService) {
    this.client = new Client({
      user: configService.get('DB_USER') || 'postgres',
      password: configService.get('DB_PASSWORD') || 'postgres',
      host: configService.get('DB_HOST') || 'localhost',
      port: configService.get('DB_PORT') || 5432,
      database: configService.get('DB_DB_NAME') || 'AstroBookings',
    });
  }

  // ToDo: Add a pool and call connect() at application start

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async query(query: string, args?: any[]): Promise<any> {
    if (!this.#connected) {
      await this.connect();
      this.#connected = true;
      this.#logger.verbose('🤖 Connected to the database');
    }
    return this.client.query(query, args);
  }
}

// To do:
// https://github.com/AstroBookings/notify_api/blob/main/test/5_0-operations-clear.sql

// https://github.com/AstroBookings/notify_api/blob/main/test/5_1-operations-create.sql
