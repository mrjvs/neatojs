/* eslint-disable @typescript-eslint/no-base-to-string -- toString is overwritten */
/* eslint-disable no-console -- this file is litterally a logger */
import chalk from 'chalk';

export class NeatConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NeatConfigError';
  }

  getPretty() {
    return this.toString();
  }

  printAndExit() {
    console.error(this.getPretty());
    process.exit(1);
  }

  plainPrintAndExit() {
    console.error(this.toString());
    process.exit(1);
  }
}

interface FancyErrorOptions {
  badge?: string;
  errors: {
    title: string;
    details?: string;
  }[];
}

function makeFancyError(ops: FancyErrorOptions) {
  let out = chalk.gray('┌  ') + chalk.bgRed.white(` ${ops.badge ?? 'failed'} `);
  ops.errors.forEach((err) => {
    out += `\n${chalk.gray('│')}`;
    out += `\n${chalk.redBright('●  ')}${chalk.bold.white(err.title)}`;
    if (err.details) out += `\n${chalk.gray('│  ')}${chalk.gray(err.details)}`;
  });

  out += `\n${chalk.gray('│')}`;
  out += `\n${chalk.gray('└  ')}${chalk.redBright('Exiting!')}`;
  return out;
}

export interface Validation {
  message: string;
  path: string;
}

export class ValidationError extends NeatConfigError {
  validations: Validation[];

  constructor(validations: Validation[]) {
    const simpleErrors = validations
      .map((v) => `=> [${v.path}]: ${v.message}`)
      .join('\n');
    super(`Failed to validate:\n${simpleErrors}`);
    this.name = 'ValidationError';
    this.validations = validations;
  }

  getPretty() {
    return makeFancyError({
      badge: 'config-schema',
      errors: this.validations.map((v) => ({
        title: v.message,
        details: `path: $.${v.path}`,
      })),
    });
  }
}

export class FileLoadError extends NeatConfigError {
  detailedMessage: string;

  constructor(message: string) {
    super(`Couldn't load from configuration source: ${message}`);
    this.name = 'LoadError';
    this.detailedMessage = message;
  }

  getPretty() {
    return makeFancyError({
      badge: 'config-load',
      errors: [
        {
          title: `Couldn't load from configuration source!`,
          details: this.detailedMessage,
        },
      ],
    });
  }
}

export class LoaderInputError extends NeatConfigError {
  detailedMessage: string;

  constructor(message: string) {
    super(`Invalid configuration parameters: ${message}`);
    this.name = 'InputError';
    this.detailedMessage = message;
  }

  getPretty() {
    return makeFancyError({
      badge: 'config-load',
      errors: [
        {
          title: `Invalid configuration parameters!`,
          details: this.detailedMessage,
        },
      ],
    });
  }
}
