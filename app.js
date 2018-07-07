const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const cors = require('kcors')
const Cors = require('./config/cors.config')
require('babel-register')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const mongodbConfig = require('./config/mongo.conf')

// 所有api
const routes = fs.readdirSync('./routers').map(item => require(`./routers/${item}`))

// 连接数据库
mongoose.Promise = Promise
mongoose.connect(mongodbConfig.url)

onerror(app)

app.proxy = true;
app.key = ['xinyan'];
app.use(cors({
    credentials: true,
    origin: (ctx) => {
      return (Cors.whiteList.find(item => item === ctx.header.origin) || Cors.domain.test(ctx.header.origin)) ? ctx.header.origin : Cors.default;
    },
  }));

// app.use('/', koa.static())

// 上传文件 解析body中间件
app.use(bodyparser({
    enableTypes:['json', 'form', 'text'],
    "formLimit": "5mb",
    "jsonLimit": "5mb",
    "textLimit": "5mb",
}))

app.use(json())
app.use(logger())

routes.forEach(item => {
    app.use(item.routes(), item.allowedMethods)
})

app.on('error', (err, ctx) => {
    console.error('serevr error', err, ctx)
});

app.listen(3000);
console.log('started at port 3000...')

// module.exports = app