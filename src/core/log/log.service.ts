import { cleanText } from '@ab/utils/text-cleaner.util';
import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  wrapContextWithColor,
  wrapMessageWithColor,
  wrapTimestampWithColor,
} from './log-colors.util';

@Injectable()
export class LogService implements LoggerService {
  private readonly logLevel: string;

  constructor(private readonly configService: ConfigService) {
    this.logLevel = this.configService.get<string>('LOG_LEVEL', 'info');
  }

  /**
   * For critical or unexpected errors that should not occur.
   * @param message - The error message to log.
   * @param context - Optional context information.
   */
  error(message: string, context?: string): void {
    this.#formatAndLog('error', message, context);
    if (context && context.length > 100) {
      this.debug(context, 'LogService');
    } else {
      const currentStack = new Error().stack;
      this.debug(`currentStack: ${currentStack}`, 'LogService');
    }
  }

  /**
   * For potential issues or expected errors that may impact functionality.
   * @param message - The warning message to log.
   * @param context - Optional context information.
   */
  warn(message: string, context?: string): void {
    this.#formatAndLog('warn', message, context);
    const currentStack = new Error().stack;
    this.debug(`currentStack: ${currentStack}`, 'LogService');
  }

  /**
   * For general information that should be logged.
   * @param message - The log message to log.
   * @param context - Optional context information.
   */
  log(message: string, context?: string): void {
    this.#formatAndLog('log', message, context);
  }

  /**
   * For detailed information of the inner working of the application.
   * @param message - The verbose message to log.
   * @param context - Optional context information.
   */
  verbose(message: string, context?: string): void {
    this.#formatAndLog('verbose', message, context);
  }

  /**
   * Intended for debugging purposes, (stack traces, variable values, etc.)
   * @param message - The debug message to log.
   * @param context - Optional context information.
   */
  debug(message: string, context?: string): void {
    this.#formatAndLog('debug', message, context);
  }

  #formatAndLog(level: LogLevel, message: string, context?: string): void {
    if (this.#shouldSkip(level)) return;
    const cleanContext = context ? cleanText(context) : 'Unknown';
    const formattedContext = wrapContextWithColor(level, cleanContext);
    const formattedTimestamp = wrapTimestampWithColor(this.#getTimestamp());
    const formattedMessage = wrapMessageWithColor(message, level);

    console.log(`${formattedTimestamp} ${formattedContext} ${formattedMessage}`);
  }

  #getTimestamp(): string {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0]; // HH:MM:SS
    return timestamp;
  }

  #shouldSkip(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'verbose', 'log', 'warn', 'error'];
    const minLogLevel = 0; //levels.indexOf(this.logLevel);
    const levelIndex = levels.indexOf(level);
    const shouldSkip = levelIndex < minLogLevel;
    return shouldSkip;
  }
}

// Moved to shared/utils/text-cleaner.util.ts
