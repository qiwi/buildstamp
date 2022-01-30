// https://gist.github.com/loklaan/9fe7768576466c5a31c2e7af4cfdecd0
// https://github.com/facebook/jest/issues/2702

const fs = require('fs');
const path = require('path');
const resolve = require('resolve');

function defaultResolver (path, options) {
  return resolve.sync(path, {
    ...options,
    basedir: options.basedir,
    extensions: options.extensions,
    moduleDirectory: options.moduleDirectory,
    paths: options.paths,
    packageFilter: mapModuleFieldToMain,
  });
}

module.exports = defaultResolver;

function mapModuleFieldToMain (pkg, pkgDir) {
  const moduleSrcPath = pkg['module'];
  const absModulePath = path.resolve(pkgDir, moduleSrcPath || '')
  const isModuleFieldAvailable = moduleSrcPath &&
    fs.existsSync(absModulePath);

  // Use 'module' path only if 'main' is not available and 'module' field is
  // found.
  if (isModuleFieldAvailable && pkg['main']) {
    if (!pkg.type) {
      const pkgJsonPath = path.join(pkgDir, 'package.json')
      fs.writeFileSync(
        pkgJsonPath,
        JSON.stringify({
          ...JSON.parse(fs.readFileSync(pkgJsonPath, {encoding: 'utf8'})),
          type: 'module'
        }, null, 2),
        {encoding: 'utf8'}
      );
    }

    return Object.assign({}, pkg, {
      type: 'module',
      main: moduleSrcPath,
    });
  }

  return pkg;
}
