const router = require('koa-router')()
const Login = require('../models/login.mongo')
const crypto = require('crypto')

router.post('/api/user/add', async (ctx, next) => {
  const body = ctx.request.body;
  try {
    console.log(body);
    const nickname = await Login.findOne({ nickname: body.nickname });
    if (nickname) {
        ctx.body = {
            error: true,
            msg: `昵称${body.nickname}已存在`,
            errorCode: 20001
        }
    } else {
        const salt = String(Math.random()).substr(2, 8) 
        const pwd_salt = `${body.pwd}${salt}`   //  加盐
        const md5 = crypto.createHash('md5')
        md5.update(pwd_salt)
        const password = md5.digest('hex')
        user = await Login.create({
            avatar: body.avatar,
            nickname: body.nickname,
            phone: body.phone,
            create_time: body.create_time,
            password
        })
        ctx.body = {
            msg: '注册成功'
        }
    }
  } catch(e) {
      console.log(e)
      ctx.body = {
          error: e,
          msg: '注册出错',
          errorCode: 20002,
      }
  }
})

module.exports = router
