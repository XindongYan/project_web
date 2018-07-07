## 启动dev

## win
"scripts": {
    "start": "set NODE_ENV = dev && node app.js",   //node app.js为入口文件非唯一也可能是bin/www
    ...
},

## mac
"scripts": {
    "start": "export NODE_ENV = dev && node app.js",
},

## pm2部署
pm2 start node app.js --watch   // watch参数 当你的koa2应用代码发生变化时，pm2自动帮你重启服务