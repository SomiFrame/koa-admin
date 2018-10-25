const Router = require('koa-router')
const router = new Router({
    prefix: "/videos"
})
const Models = require('../../mongodb/models')
const _ = require('lodash')

const VideoModel= Models.M_Video
const TagModel= Models.M_Tag

router
    .post('/',async(ctx,next)=>{
        let {title,description,tags,image,video} = ctx.request.body
        if(ctx.errors) {
            ctx.status = 400
            ctx.body = {
                status: 1,
                message: 'validated failed',
                error: ctx.errors
            }
            return
        }
        const instance = new VideoModel({
            title,description,tags,image,video
        })
        const res = await instance.save()
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
            const {limit,page,tag_name} = ctx.request.query
            let row,total
            if(tag_name) {
                let tag = await TagModel
                    .findOne({name: tag_name})
                rows = await VideoModel
                    .find({tags: tag._id})
                    .populate({path:'tags'})
                    .skip(+limit*(page-1))
                    .limit(+limit)
                    .sort({createdOn:-1})
                    .exec()
                total = await VideoModel.find({tags:tag._id}).count().exec()
            }
            else {
                rows = await VideoModel
                    .find()
                    .populate({path:'tags'})
                    .skip(+limit*(page-1))
                    .limit(+limit)
                    .sort({createdOn:-1})
                    .exec()
                total = await VideoModel.count().exec()
            }
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
            ctx.body = {
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
        const {id} = ctx.params
        let res
        try {
            res = await VideoModel.remove({ _id: id}).exec()
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
    .put('/:id',async(ctx,next)=>{
        const {id} = ctx.params
        const {tags,title,image,video,ref_img_path,ref_video_path,description}= ctx.request.body
        try {
            let row = await VideoModel.findById(id)
            row.set({
                tags: tags||row.tags,
                title: title||row.title,
                video: video||row.video,
                image: image||row.image,
                ref_img_path : ref_img_path || row.ref_img_path,
                ref_video_path: ref_video_path || row.ref_video_path,
                description : description|| row.description
            })
            console.log('row:',row)
            await row.save()
            ctx.body = {
                status: 0,
                message: 'success',
                data: row
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
