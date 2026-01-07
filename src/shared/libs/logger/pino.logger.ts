import { Logger as PinoInstance, pino } from 'pino';
import { Logger } from './logger.interface.js';

export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    this.logger = pino();
  }

  public debug(message: string, ...args: unknown[]): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.logger.warn(message, ...args);
  }
}
