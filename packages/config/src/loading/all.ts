import { cliLoader } from './loaders/cli';
import { dirLoader } from './loaders/dir';
import { environmentLoader } from './loaders/environment';
import { fileLoader } from './loaders/file';

export const loaders = {
  environment: environmentLoader,
  cli: cliLoader,
  file: fileLoader,
  dir: dirLoader,
};
