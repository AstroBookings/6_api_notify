import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { convertToKB } from 'src/shared/utils/size-converter.util';
import { wrapStatusWithColor } from './log-colors.util';

/**
 * Middleware function to log HTTP requests and responses
 * @description This middleware logs details of incoming HTTP requests and outgoing responses.
 * It's configured in the AppModule to be applied globally to all routes.
 * The log includes method, URL, status code, and response size.
 * @param req - The incoming HTTP request
 * @param res - The outgoing HTTP response
 * @param next - The next middleware function in the chain
 */
export function logMiddleware(req: Request, res: Response, next: NextFunction) {
  const { method, originalUrl } = req;
  // Log the request on the finish event of the response
  res.on('finish', () => {
    const statusCode: number = res.statusCode;
    const statusCodeText = wrapStatusWithColor(statusCode);
    const contentLength: number = parseInt(res.get('content-length') || '0');
    const contentText = convertToKB(contentLength);
    const message = `${method} ${originalUrl} ${statusCodeText} ${contentText}`;
    new Logger('HTTP').verbose(message);
  });

  // Continue to the next middleware
  next();
}

// Moved to shared/utils/size-converter.util.ts

/* const KB = 1024;
/**
 * Converts bytes to KB when more than 1024
 * @param bytes - The number of bytes to convert
 * @returns A string representation of the size in B or KB
 */
/*
export function convertToKB(bytes: number): string {
  if (bytes <= KB) return `${bytes}Bs`;
  return `${(bytes / KB).toFixed(2)}KBs`;
}
 */
