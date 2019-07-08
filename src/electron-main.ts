import url from 'url';
import { app, BrowserWindow, protocol } from "electron";
import path from 'path';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

import appSettings from './appSettings';
import { init as initServer } from './server';

let mainWindow: Electron.BrowserWindow;
let server;

autoUpdater.on('checking-for-update', (...args) => {
  log.info('checking for update');
  log.info(args);
});

autoUpdater.on('checking-for-update', (...args) => {
  log.info('checking for update');
  log.info(args);
});

autoUpdater.on('error', (...args) => {
  log.info('error');
  log.info(args);
});

autoUpdater.on('update-downloaded', (info) => {
  log.info(info);
  log.info('update needed');
  autoUpdater.quitAndInstall();
});

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: { webSecurity: false, allowRunningInsecureContent: true }
  });
  
  if (appSettings.NODE_ENV === 'production' || appSettings.USE_PROD_WEB) {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, './web/index.html'),
      protocol: 'file',
      slashes: true
    }));
  } else
    mainWindow.loadURL(`http://localhost:${appSettings.WEB_APP_PORT}`);

  if (appSettings.NODE_ENV !== 'production')
    mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", async () => {
  protocol.interceptFileProtocol('file', (request, cb) => {
    let res = request.url;

    // Req from html ?
    if (!request.url.includes(__dirname))
      res = path.normalize(path.resolve(__dirname, './web/') + request.url.substr(7));
    else if (res.includes('file://'))
      res = res.replace('file://', '');

    return cb(res);
    // tslint:disable-next-line no-empty
  }, (err) => {});

  server = await initServer();
  await createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }

  if (server !== null) {
    server.close();
    server = null;
  }
});

app.on("activate", async () => {
  if (mainWindow === null) {
    if (server === null)
      server = await initServer();

    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.