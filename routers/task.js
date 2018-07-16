const router = require('koa-router')()
const upload = require('../models/upload.mongo')

router.get('/api/task/all', async (ctx, next) => {
    const query = ctx.request.query;
    try {
        if (query.title) {
            const task = await upload.find({title: query.title})    // 标题查询
            ctx.body = { page: task }
        } else {
            const taskall = await upload.find({})   //  查询全部
            ctx.body = { taskall}
        }
    } catch(e) {
        ctx.body ={
            error: e,
            msg: '查询错误',
            errorCode: 3001
        }
    }
})

router.post('/api/task', async (ctx, next) => {
    const body = ctx.request.body;
    try {
        if (body.title && body.body && body.auther) {
            const result = upload.create({
                title: body.title,
                body: body.body,
                auther: body.auther
            })
            ctx.body = {
                msg: '保存成功',
                result
            }
        } else{
            ctx.body = {
                error: e,
                msg: '字段填写完整'
            }
        }
    } catch(e) {
        ctx.body = {
            error: e,
            msg: '添加错误',
            errorCode: 3002
        }
    }
})

module.exports = router