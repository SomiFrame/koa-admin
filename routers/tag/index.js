const Router = require('koa-router')
const Models = require('../../mongodb/models')
const _ = require('lodash')
const router = new Router()
const TagModel = Models.M_Tag

router
    .get('/tags',async (ctx,next)=>{
        if(_.isEmpty(ctx.request.query)){
            const rows = await TagModel.find().exec()
            const total = await TagModel.count().exec()
            ctx.body = {
                status: 0,
                message: "success",
                data: {
                    data: rows,
                    total
                },
                error: null
            }
        }else {
            try{
                const {limit=10,page=1} = ctx.request.query
                const rows =
                    await TagModel.find()
                    .limit(+limit)
                    .skip(limit*(page-1))
                    .sort({
                        createdOn: -1
                    })
                    .exec()
                const total =
                    await TagModel.count()
                    .exec()
                ctx.body = {
                    status: 0,
                    message: "success",
                    data: {
                        data: rows,
                        total
                    },
                    error: null
                }
            }catch(err) {
                ctx.body={
                    status: 1,
                    message: "failed",
                    data: null,
                    error: err
                }
            }
        }
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
