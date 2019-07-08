import dotenv from "dotenv";
import path from 'path';

import { app } from "electron";

const isElectron = !!app;

export interface IAppSettings {
  NODE_ENV: 'production' | 'development';
  APP_PORT: string | number;
  BUILD_MAIN_DIR: string;
  PERSISTANCE_PATH: string;
  USE_PROD_WEB: boolean;
  WEB_APP_PORT: string | number;
}

const appSettings: IAppSettings = {} as IAppSettings;

const env = process.env.NODE_ENV || 'production';

// Load env files into appSettings
const { parsed } = dotenv.config({
  path: path.resolve(__dirname, `./env/${env === 'production' ? 'prod.env' : 'dev.env'}`)
});

Object.assign(appSettings, parsed);

// Other settings
appSettings.BUILD_MAIN_DIR = __dirname;
appSettings.PERSISTANCE_PATH = path.resolve(__dirname, '../../data');

Object.defineProperty(appSettings, 'PERSISTANCE_PATH', {
  get() {
    return isElectron ? path.join(app.getPath('userData'), './devnotebooks') : path.resolve(__dirname, '../../data');
  }
});

Object.defineProperty(appSettings, 'NODE_ENV', {
  get() {
    return env;
  }
});

export default appSettings;