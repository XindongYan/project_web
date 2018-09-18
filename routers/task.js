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

router.get('/api/test', async (ctx, next) => {
    const id = ['5b4b7740470e5a024c2b596d', '5b4b77a2470e5a024c2b596e', '5b4b77f2470e5a024c2b596f'];
    const awaitArray = [];
    const a = [];
    var ze = 0;
    for (let index = 0; index < id.length; index++) {
        // awaitArray.push( 
        //     upload.findOneAndUpdate({ _id: id[index] }, { $set: { auther: '真实故事' } }) 
        // )
        a.push(upload.findOneAndUpdate({ _id: id[index], __v: {$lte: ze} }, { $set: { auther: '事' } }, { new: true }))
    }

//    await Promise.all(awaitArray);
   var result = await Promise.all(a); 
    ctx.body = {
        result
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