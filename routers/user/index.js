const Router = require('koa-router')
const router = new Router()

router
    .post('/login',async(ctx,next)=>{
        ctx.body="login"
    })

module.exports = router
