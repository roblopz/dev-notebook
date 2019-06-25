import dotenv from "dotenv";
import path from 'path';

export interface IAppSettings {
  NODE_ENV: string;
  ENV: string;
  APP_PORT: string | number;
  BUILD_MAIN_DIR: string;
  ORIGINAL_MAIN_DIR: string;
  PERSISTANCE_FOLTER: string;
}

const appSettings: IAppSettings = {} as IAppSettings;

// Load env files into appSettings
const originalSourceWorkdir = path.resolve(process.cwd(), './src/server/');

const { parsed } = dotenv.config({
  path: path.resolve(originalSourceWorkdir, `./env/${process.env.NODE_ENV === 'production' ? 'prod.env' : 'dev.env'}`)
});

Object.assign(appSettings, parsed);

// Other settings
appSettings.ORIGINAL_MAIN_DIR = originalSourceWorkdir;
appSettings.BUILD_MAIN_DIR = __dirname;
appSettings.PERSISTANCE_FOLTER = path.resolve(appSettings.ORIGINAL_MAIN_DIR, '../../data');

Object.defineProperty(appSettings, 'ENV', {
  get() {
    return appSettings.NODE_ENV === 'production' || process.env.NODE_ENV === 'production'
      ? 'production' : 'development';
  }
});

export default appSettings;