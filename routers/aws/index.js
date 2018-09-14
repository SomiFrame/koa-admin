const Router = require('koa-router')
const aws = require('aws-sdk')
const STS = aws.STS
const router = new Router()
const UserName = "Uploader"
const sts = new STS({region:"ap-northeast-1"})

const getSessionToken = () =>{
    return new Promise ((resolve,reject)=>{
        sts.getSessionToken((err,data)=>{
            err?reject(err):resolve(data)
        })
    })
}
router
    .get('/certification',async(ctx,next)=>{
        let res;
        try {
            res = await getSessionToken()
            ctx.body = {
                status: 0,
                message: 'success',
                data: res.Credentials
            }
        }catch(err) {
            ctx.body ={
                status:1,
                message: 'failed',
                data: err
            }
        }
    })

module.exports = router
