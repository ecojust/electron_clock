import { app, BrowserWindow,Menu,ipcMain} from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

  const scale = 0.8;
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 768 * scale,
    width: 1920 * scale,
    useContentSize: true,
    resizable: false ,
    maximizable: false,
    darkTheme:true,
    type:'textured',
    backgroundColor:'#34hg23',
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(winURL);
  //mainWindow.setFullScreen(true);
  // Menu.setApplicationMenu(null)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('win-close',()=>{
  mainWindow.close();
})
ipcMain.on('win-min',()=>{
  mainWindow.minimize();
})


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */


 //tcp服务端
var net = require('net');
var server = net.createServer(function(connection) { 
   
   connection.on('end', function() {
      //console.log('客户端关闭连接');
   });
   connection.on('data',function(data){
    //console.log('服务端：收到客户端发送数据为',data)
    mainWindow.webContents.send('moveScreen',data)
   })
});
server.listen(9002, function() { 
  console.log('server is listening');
});
