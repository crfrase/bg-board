import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (host: Tree, schema: any) {
  if (!schema.name.startsWith("util-")) {
    schema.name = "util-" + schema.name;
  }

  schema.linter = "tslint";
  schema.tags = "type:util,scope:" + schema.directory;
  await libraryGenerator(host, { name: schema.name, linter: schema.linter, directory: schema.directory });
  await formatFiles(host);
  return () => {
    installPackagesTask(host);
  };
}
