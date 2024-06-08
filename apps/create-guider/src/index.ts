import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cancel, intro, outro, spinner, text } from '@clack/prompts';
import { copy, rename } from 'fs-extra';
import { assertCancel } from './utils/prompts';
import { exists } from './utils/files';

const distPath = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.join(distPath, '../');
const mainTemplateDir = path.join(cliRoot, 'templates/main');

const s = spinner();
intro(`@neato/create-guider`);

const projectName = await text({
  message: 'what to name the project folder?',
  placeholder: 'my-docs',
  validate(value) {
    if (!/\.?[A-Za-z0-9 _-]+/g.test(value))
      return 'Cannot contain special characters';
  },
});
assertCancel(projectName);

const projectDir = `./${projectName.toString()}`;
if (await exists(projectDir)) {
  cancel('A file or folder with that name already exists');
}

s.start('Creating files');
await copy(mainTemplateDir, projectDir);
await rename(
  path.join(projectDir, '_gitignore'),
  path.join(projectDir, '.gitignore'),
);
s.stop('Created files');

outro(`Enjoy your new documentation!`);
