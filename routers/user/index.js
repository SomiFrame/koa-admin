const bcrypt = require('bcrypt')
const Router = require('koa-router')
const router = new Router()
const Models= require('../../mongodb/models')

const UserModel= Models.M_User
const instance = new UserModel()

const saltRounds = 10

router
    .post('/login',async(ctx,next)=>{
        console.log('ctx',ctx.request.body)
        ctx.verifyParams({
            email: 'email',
            password: 'password'
        })
        const {body:{email,password}} = ctx.request
        const row = await UserModel.find({email}).exec()
        if(row[0]) {
            const {password: originPassword} = row[0]
            const comparePassword = await bcrypt.compare(password,originPassword)
            comparePassword?ctx.body="login success":ctx.body="login failed"
        }else {
            ctx.body="login failed"
        }
    })
    .post('/register',async(ctx,next)=>{
        console.log('current router /register')
        ctx.verifyParams({
            email: 'email',
            password: 'password',
        })
        const {body:{ email,password }} = ctx.request
        const password_hash =  await bcrypt.hash(password,saltRounds)
        console.log("passowrd_hash",password_hash)
        instance.email = email
        instance.password= password_hash
        const res = await instance.save()
        console.log(res)
        ctx.body = "successful"

    })
module.exports = router
