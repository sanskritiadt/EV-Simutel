const { app, BrowserWindow, Menu, ipcMain, screen } = require('electron');
const path = require('path');
// const usbDetection = require('usb-detection');
let mainWindow;

// const expectedHash = '070D34651CC1C079';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, '../icon.ico')
  });

  mainWindow.setMenu(null);

  mainWindow.loadFile(path.join(__dirname, 'home.html')).catch(err => {
    console.error('Failed to load index.html:', err);
  });
  

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

//   usbDetection.startMonitoring();
//   setInterval(checkConnectedDevices, 2000);

//     async function checkConnectedDevices() {
//         const devices = await usbDetection.find();
//         keys = [];
//         devices.forEach(device => {
//             const hardwareKey = device.serialNumber;
//             keys.push(hardwareKey);
//         });
//         console.log(keys);
//         if (keys.includes(expectedHash)) {
//           mainWindow.webContents.send('unlock');
//         } else {
//           mainWindow.webContents.send('lock');

//           await mainWindow.loadURL(path.join(__dirname, 'home.html'))
//           dialog.showErrorBox("Error: Hardware lock not found", "Please insert the hardware key.")
//         }
//     }
}

ipcMain.handle('get-screen-info', () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.size;
  return { width, height };
});

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
