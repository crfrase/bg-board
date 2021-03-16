import { Tree, formatFiles, updateJson } from '@nrwl/devkit';
const JSON5 = require('json5')

export default async function (host: Tree, schema: any) {
  updateJson(host, "workspace.json", (json) => {
    json.version = json.version + 1;
    json.projects = sortObjectKeys(json.projects);
    return json;
  });

  updateJson(host, "nx.json", (json) => {
    json.projects = sortObjectKeys(json.projects);
    return json;
  });

  updateJson(host, "tsconfig.base.json", (json) => {
    json.compilerOptions.paths = sortObjectKeys(json.compilerOptions.paths);
    return json;
  });

  const jestStr = host.read("jest.config.js");
  let jsonPart = jestStr.subarray(jestStr.indexOf("{"), jestStr.lastIndexOf("}")+1).toString();
  const moduleExports = JSON5.parse(jsonPart);;
  moduleExports.projects = moduleExports.projects.sort();
  //host.write("jest.config.js", `module.exports = ${JSON5.stringify(moduleExports)};`);


  await formatFiles(host);
}

function sortObjectKeys(obj: any) {
  const sorted = {};
  Object.keys(obj).sort().forEach(key => {
    sorted[key] = obj[key];
  });
  return sorted;
}
