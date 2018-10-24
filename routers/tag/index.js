const Router = require('koa-router')
const Models = require('../../mongodb/models')
const _ = require('lodash')
const router = new Router({
    prefix: '/tags'
})
const TagModel = Models.M_Tag

router
    .get('/:id',async(ctx,next)=>{
        const {id} = ctx.params
        try {
            const row = await TagModel.findById(id)
            ctx.body = {
                status: 0,
                message: 'success',
                data: row
            }
        }catch (err){
            ctx.body = {
                status: 1,
                message: 'failed',
                error: err
            }
        }

    })
    .get('/',async (ctx,next)=>{
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
    .post('/',async (ctx,next)=>{
        let name = ctx.checkBody('name')
            .notMatch(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/,"can't enter illegal symbol")
            .value
        if(ctx.errors) {
            ctx.status = 400
            ctx.body ={
                status: 1,
                message: "validated failed",
                error: ctx.errors
            }
            return
        }
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
    .delete('/:id',async(ctx,next)=>{
        let id = ctx.checkParams('id').escape().value
        try {
            let res = await TagModel.remove({_id: id})
            ctx.body = {
                status: 0,
                data: res,
                message: "success"
            }
        }catch(error) {
            ctx.body = {
                status: 1,
                error,
                message: "failed"
            }
        }
    })
    .put('/:id',async(ctx,next)=>{
        const id = ctx.checkParams('id').escape().value
        const {name} = ctx.request.body
        try{
            let row = await TagModel.findById(id)
            row.set({
                name: name||row.name
            })
            await row.save()
            ctx.body= {
                status: 0,
                message: 'success',
                data: row
            }
        }catch(err) {
            ctx.body={
                status: 1,
                message: 'failed',
                error: err
            }
        }
    })

module.exports = router
