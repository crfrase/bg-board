import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { SchematicOptions } from './schema';

export default async function (host: Tree, schema: SchematicOptions) {
  if (!schema.name.startsWith("util-")) {
    schema.name = "util-" + schema.name;
  }

  if (!schema.linter) {
    schema.linter = "tslint";
  }
  if (!schema.tags) {
    schema.tags = "type:util,scope:" + schema.directory;
  }
  await libraryGenerator(host, { name: schema.name, linter: schema.linter, directory: schema.directory, tags: schema.tags });
  await formatFiles(host);
  return () => {
    installPackagesTask(host);
  };
}
