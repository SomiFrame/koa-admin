const Router = require('koa-router')
const aws = require('aws-sdk')
const STS = aws.STS
const router = new Router()
const UserName = "Uploader"
const sts = new STS({region:"ap-northeast-1"})
//const listAccessKeys = () => {
//    return new Promise((resolve,reject)=>{
//        iam.listAccessKeys({UserName},(err,data)=>{
//            err?reject(err):resolve(data)
//        })
//    })
//}
//const createAccessKey = () =>{
//    return new Promise((resolve,reject)=>{
//        const res = iam.createAccessKey({UserName:'temporay'},(err,data)=>{
//            err?reject(err):resolve(data)
//        })
//    })
//}

const params = {
    DurationSeconds: 3600,
    RoleArn: 'arn:aws:iam::031446360947:role/somi',
    RoleSessionName: 'somi'
}
const getSessionToken = () =>{
    return new Promise ((resolve,reject)=>{
        sts.assumeRole(params,(err,data)=>{
            err?reject(err):resolve(data)
        })
    })
}
router
    .get('/certification',async(ctx,next)=>{
        let res;
        try {
            res = await getSessionToken()
            console.log(res)
            ctx.body = {
                status: 0,
                message: 'success'
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
