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