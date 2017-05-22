const configuration = require('./config/main')
const tileConfig = require('./config/tiles');
const filePicker = require('./file-picker');
const path = require('path');

const { app, BrowserWindow } = require('electron');

let window;

const createWindow = () => {
  window = new BrowserWindow(configuration.browserWindow);
  window.on('closed', () => window = null);

  const tileConfigFile = filePicker.json();

  if (!tileConfigFile) {
    return window.loadURL(configuration.urls.default);
  }

  tileConfig.from(tileConfigFile[0])
  .then(config => {

    console.log('Loaded Tile Config');

    window.loadURL(configuration.urls.index);

    window.webContents.on('did-finish-load', () => {
      window.webContents.send('new-config', config);
    });

  })
  .catch(error => {
    console.log('Failed to load Tile Config');
    window.loadURL(configuration.urls.error(error));
  });

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});
