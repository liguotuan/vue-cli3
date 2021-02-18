const os = require('os');
module.exports = {
  /* 
    desc获取当前主机ip
  */
  getIPaddress() {
    let interfaces = os.networkInterfaces();
    for (let devName in interfaces) {
      let interface = interfaces[devName];
      for (let i = 0; i < interface.length; i++) {
        let alias = interface[i];
        if (alias.family == 'IPv4' && !alias.internal && alias.address != '127.0.0.1') {
          return alias.address;
        }
      }
    }
  }, 
  /* 
    取出命令行参数
  */
 getArgv() {
   const argv = process.argv;
   return argv.splice(3)
 }
} 