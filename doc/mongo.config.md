## 配置
module.exports = {
    dev: {
        url: 'mongodb://127.0.0.1:27017/xinyan' //连接
    }
}[ 'dev']  //默认dev

## app.js
const mongoose = require('mongoose')    //引入mongoose
const mongodbConfig = require('./config/mongo.conf')    //引入配置文件
mongoose.Promise = Promise
mongoose.connect(mongodbConfig.url)

## 配置连接完成