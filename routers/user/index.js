const Router = require('koa-router')
const router = new Router()

router
    .post('/login',async(ctx,next)=>{
        console.log('ctx',ctx.request.body)
        ctx.verifyParams({
            email: 'email',
            password: 'password'
        })
        const {body} = ctx.request
        ctx.body={
            ...body
        }

    })

module.exports = router
