const electron = require('electron');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('window-all-closed', function () {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('ready', function() {
	mainWindow = new BrowserWindow({ width: 1360, height: 800 });

	mainWindow.loadURL('file://' + __dirname + '/public/index.html');
	mainWindow.openDevTools();

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});

