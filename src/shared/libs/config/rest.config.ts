import { Config } from './config.interface.js';
import { config } from 'dotenv';
import {Logger} from '../logger/index.js';
import {RestSchema, configRestSchema} from './rest.schema.js';
import { inject, injectable } from 'inversify';
import {Component} from '../../types/index.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    const parsedOutput = config();

    const result = configRestSchema.safeParse(parsedOutput.parsed);

    if (!result.success) {
      this.logger.error('[Config] Invalid configuration:', result.error);
      throw new Error('Can\'t validate .env file');
    }

    this.config = result.data;
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
