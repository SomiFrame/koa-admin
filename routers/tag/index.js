const Router = require('koa-router')
const Models = require('../../mongodb/models')

const router = new Router()
const TagModel = Models.M_Tag

router
    .get('/tags',async (ctx,next)=>{
        const rows = await TagModel.find()
        console.log(rows)
        ctx.body={}
    })
    .post('/tags',async (ctx,next)=>{
        const {name} = ctx.request.body
        let instance = new TagModel()
        instance.name = name
        try {
            const row = await instance.save()
            ctx.body = {
                status: 0,
                message: "success",
                error: null,
                data: row
            }
        } catch(err) {
            ctx.body={
                status: 1,
                message: "failed",
                error: err,
                data: null
            }
        }
    })

module.exports = router
