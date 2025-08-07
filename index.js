const { app, BrowserWindow, globalShortcut, dialog } = require('electron');

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
  win.loadURL("https://grafana.smarttraktest.org/d/besyu7p1vrmyof/executive-dashboard-plant-id-500?orgId=1&from=now-6h&to=now&timezone=browser&var-plant_id=500&var-plant_name=Andhra%20Pradesh%20Solar%20Park%205MW&var-last_updated_on=18:48:2%20%282025-08-06T13:18:02.784459419Z%29&var-exported_power=1640.61&var-total_yield=92970000&var-start_time=5:58&var-stop_time=18:39&var-PR=&var-CUF_AC=23.2&var-CUF_DC=&var-current_ac_energy=52390&var-current_ghi=0&var-monthly_ac_energy=792359060&var-monthly_ghi=396.54&var-total_downtime=&var-inv_power_percentage=&var-inv_loss_percentage=&var-export_efficiency=&var-export_abt_power=92970000&var-inverter_efficiency=32.82&var-inv_power=37&var-device_id=VAC-INV-500-001&var-wms_id=wms_500_001&var-timezone=Asia%2FKolkata&var-mqtt_topic=smarttrak%2Ftelemetry%2F500%2Fabt%2FABT-500-001&var-installed_ac_capacity=5000&var-current_ac_diff=-6.22&var-current_ghi_diff=-100&var-humidity=25.7&var-wind_speed=3.7&var-air_temp=30.1&var-irradiance=0&var-ambient_temp=30.1&var-module_temp=30.1&var-mqtt_topic_multi_select=smarttrak%2Ftelemetry%2F448%2Fpanels%2Fpanels_488_001&var-inv1_downtime=127.33&var-inv2_downtime=207.33&var-inv3_downtime=85.33&var-inv_names=inverter_500_001&var-inv_devices=%7BVAC-INV-500-001,VAC-INV-500-002,VAC-INV-500-003,VAC-INV-500-004%7D&var-inv_power_1=249&var-inv_power_2=104&var-inv_power_3=107&var-percent_inv_1=54.13&var-percent_inv_2=22.61&var-percent_inv_3=23.26&var-inv_1_id=inverter_500_001&var-inv_2_id=inverter_500_002&var-inv_3_id=inverter_500_003&var-monthly_ghi_diff=-63.6&var-monthly_ac_diff=1.47&var-today_date=2025-07-28%2012:15:03&var-performance_fields=DC_voltage_DCV&kiosk&theme=light");

  // Shortcuts
  globalShortcut.register('Control+M', () => {
    win.minimize();
  });

  globalShortcut.register('Control+X', () => {
    app.quit();
  });

  globalShortcut.register('Control+I', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Shortcut Keys',
      message: 'SmartTrak Dashboard Shortcuts',
      detail:
        'Ctrl + M → Minimize App\n' +
        'Ctrl + I → Show Shortcut Info\n' +
        'Ctrl + X → Close App',
      buttons: ['OK']
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
