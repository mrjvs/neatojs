import { cancel, intro, outro, spinner, text } from '@clack/prompts';
import { assertCancel } from './utils/prompts';
import { exists } from './utils/files';
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from 'url';

const distPath = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.join(distPath, "../");
const mainTemplateDir = path.join(cliRoot, "templates/main");

const s = spinner();
intro(`@neato/create-guider`);

const projectName = await text({
  message: 'what to name the project folder?',
  placeholder: 'my-docs',
  validate(value) {
    if (!/\.?[A-Za-z0-9 _-]+/g.test(value))
      return "Cannot contain special characters";
  },
});
assertCancel(projectName);

const projectDir = "./" + projectName.toString()
if (await exists(projectDir)) {
  cancel("A file or folder with that name already exists");
}

s.start('Creating files');
await fs.copy(mainTemplateDir, projectDir);
s.stop('Created files')

outro(`Enjoy your new documentation!`);
