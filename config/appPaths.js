const path = require('path');

const rootPath = path.join(__dirname, '../');

module.exports = {
  rootPath,
  node_modules: path.join(rootPath, '/node_modules'),
  webBase: path.join(rootPath, '/src/web'),
  webOutput: path.join(rootPath, '/dist'),
  tsConfig: path.join(rootPath, 'tsconfig.json'),
  tsLint: path.join(rootPath, 'tslint.json'),
};
