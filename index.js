const { app, BrowserWindow, globalShortcut, dialog } = require('electron');
const { shell } = require('electron');

require('dotenv').config();
const serverUrl = process.env.SERVER_URL;
const closeShortcut = process.env.CLOSE_SHORTCUT;
const minimiseShortcut = process.env.MINIMISE_SHORTCUT;
const infoShortcut = process.env.INFO_SHORTCUT;
const urlShortcut = process.env.URL_SHORTCUT;

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    frame: false,
    kiosk: true,  // Prevents exiting fullscreen with Esc
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: __dirname + '/icon.ico',
    title: 'SmartTrak Grafana'
  });

  const customUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Kiosk";
  win.webContents.setUserAgent(customUserAgent);

  win.webContents.setWindowOpenHandler(({ url }) => {
    win.loadURL(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (e, url) => {
    e.preventDefault();
    win.loadURL(url);
  });

  // Load Grafana dashboard
  win.loadURL(serverUrl);

  // Shortcuts
  globalShortcut.register(minimiseShortcut, () => {
    win.minimize();
  });

  globalShortcut.register(closeShortcut, () => {
    app.quit();
  });

  globalShortcut.register(infoShortcut, () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Shortcut Keys',
      message: 'SmartTrak Dashboard Shortcuts',
      detail:
        `${minimiseShortcut} → Minimize App\n` +
        `${infoShortcut} → Show Shortcut Info\n` +
        `${closeShortcut} → Close App\n`+
        `${urlShortcut} → Show Dashboard URL\n`,
      buttons: ['OK']
    });
  });

globalShortcut.register(urlShortcut, () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Open Website',
    message: 'Do you want to open the SmartTrak Dashboard in your browser?',
    buttons: ['Open', 'Cancel'],
    defaultId: 0,  // default to "Open"
    cancelId: 1    // "Cancel" if Esc is pressed
  }).then(result => {
    if (result.response === 0) {
      // User clicked "Open"
      shell.openExternal(serverUrl); // Opens in default browser
    }
  });
});
}

app.whenReady().then(() => {
  createWindow();

  // Prevent ESC from breaking kiosk mode
  app.on('browser-window-focus', () => {
    globalShortcut.register('Escape', () => {
      // No action on Escape
    });
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
