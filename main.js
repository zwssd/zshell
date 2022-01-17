// 引入electron并创建一个Browserwindow
const {app, BrowserWindow} = require('electron')
const log = require('./src/frontend/utils/log')
const path = require('path')
const url = require('url')
const child_process = require('child_process');
const exec = child_process.exec;
var openExec;
 
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow

log.debug('electron start=================')
 
function createWindow () {
//创建浏览器窗口,宽高自定义具体大小你开心就好
mainWindow = new BrowserWindow({width: 1300, height: 1000})
 
  /* 
   * 加载应用-----  electron-quick-start中默认的加载入口
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  */
  // 加载应用----适用于 react 项目
  // mainWindow.loadURL('http://localhost:3006/');
  // mainWindow.loadFile('public/index.html')
  mainWindow.loadURL(`file://${__dirname}/build/index.html`);
  //mainWindow.loadURL(`file://${path.join(__dirname, './build/index.html')}`)
  // main.Window.loadURL(url.format({
  //    pathname: path.join(__dirname, './build/index.html'),
  //    protocol: 'file:',
  //    slashes: true
  // }))

  // 打开开发者工具，默认不打开
  mainWindow.webContents.openDevTools()
 
  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  //创建子进程，直接打开当前目录下的server.js
  console.log('使用openExec方法执行server.js');
  openExec = exec('node ./src/backend/server.js', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      return;
    }
    console.log('使用exec方法输出: ' + stdout);
    console.log(`stderr: ${stderr}`);
    console.log(process.pid)
  })
}
 
// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)
 
// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()

    // 判断openExec是否存在，存在就杀掉node进程
    if (!openExec) {
      // console.log('openExec is null')
    } else {
      exec('taskkill /f /t /im node.exe', function (error, stdout, stderr) {
        if (error) {
          console.log(error.stack);
          console.log('Error code: ' + error.code);
          return;
        }
        console.log('使用exec方法输出: ' + stdout);
        console.log(`stderr: ${stderr}`);
      });
    }
  }
})
 
app.on('activate', function () {
   // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow()
  }
})