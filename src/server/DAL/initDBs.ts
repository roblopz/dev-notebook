import fs from 'fs';
import path from 'path';

const dirPath = path.resolve(__dirname, './collections');

export function initDBs() {
  fs.readdirSync(dirPath).forEach(file => {
    if (file.match(/\.js$/) !== null)
      require(path.resolve(dirPath, file));
  });
}