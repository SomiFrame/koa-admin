const bcrypt = require('bcrypt')
const Router = require('koa-router')
const router = new Router({
    prefix: "/videos"
})
const Models = require('../../mongodb/models')
const _ = require('lodash')

const VideoModel= Models.M_Video

router
    .post('/',async(ctx,next)=>{
        console.log('ctx',ctx.request.body)
        const {title,description,tags,image,video} = ctx.request

        const instance = new VideoModel()
        instance.title = title
        instance.description = description
        instance.tags = tags
        instance.image = image
        instance.video = video
        const res = await instance.save()
        console.log(res)
        ctx.body = {
            status: 0,
            message: 'success',
            data: null
        }
    })
    .get('/',async(ctx,next)=>{
        if(_.isEmpty(ctx.request.query)){
            const rows = await VideoModel.find().sort({createdOn:-1}).exec()
            const total = await VideoModel.count().exec()
            ctx.body= {
                status: 0,
                message: 'success',
                data: {
                    data: rows,
                    total
                }
            }
        }else {
            const {limit,page} = ctx.request.query
            const rows = await VideoModel
                .find()
                .skip(+limit*(page-1))
                .limit(+limit)
                .populate({path:'tags'})
                .sort({createdOn:-1})
                .exec()
            const total = await VideoModel.count().exec()
            ctx.body= {
                status: 1,
                message: 'success',
                data: {
                    data: rows,
                    total
                }
            }
        }
    })
    .get('/:id',async(ctx,next)=>{
        const {id} = ctx.params
        let row
        try {
            row = await VideoModel.findOne({_id:id}).exec()
            ctx.body ={
                status: 0,
                message: "message",
                data: row
            }
        }catch(err) {
            ctx.body={
                status: 1,
                message: "error",
                data: null,
                error: err
            }
        }
    })
    .delete('/:id',async(ctx,next)=>{
        console.log(ctx.params)
        const {id} = ctx.params
        let res
        try {
            res = await VideoModel.remove({ _id: id})
            ctx.body ={
                status: 0,
                message: 'success',
                data: res
            }
        }catch(err){
            ctx.body = {
                status: 1,
                message: 'failed',
                error: err
            }
        }
    })

module.exports = router
