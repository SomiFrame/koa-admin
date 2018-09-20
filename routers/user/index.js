const bcrypt = require('bcrypt')
const Router = require('koa-router')
const Jwt = require('jsonwebtoken')
const router = new Router()
const Models= require('../../mongodb/models')
const UserModel= Models.M_User
const instance = new UserModel()

const saltRounds = 10

const secret = process.env.JWT_SECRET

router
    .post('/login',async(ctx,next)=>{
        ctx.checkBody('email')
            .isEmail("please enter email")
        ctx.checkBody('password')
            .notEmpty("password is required")
            .isAlphanumeric("password only contain number and letter")
            .len(6,15,"password length is min to 6 and max to 15")
        if(ctx.errors) {
            ctx.body = {
                status: 1,
                message: `validate failed`,
                error: ctx.errors
            }
            return
        }
        const {body:{email,password}} = ctx.request
        const row = await UserModel.find({email}).exec()
        const flag = true
        if(row[0]) {
            const {password: originPassword} = row[0]
            const comparePassword = await bcrypt.compare(password,originPassword)
            if(comparePassword) {
                const token = Jwt.sign({email},secret)
                ctx.body={
                    status: 0,
                    message: "login successful",
                    data: {
                        token
                    }
                }
            }else {
                ctx.body={
                    status: 1,
                    message: "login failed: the password you enter isn't correct",
                    data:null
                }
            }
        }else {
            ctx.body={
                    status: 1,
                    message: "login failed: the email you enter isn't exist",
                    data:null
            }
        }
    })
    .post('/register',async(ctx,next)=>{
        console.log('current router /register')
        ctx.verifyParams({
            email: 'email',
            password: 'password',
        })
        const {email} = ctx.request.body
        const row = await UserModel.find({email}).exec()
        if(row[0]){
            ctx.body = {
                status: 1,
                message: "register failed: the email you enter has already exist",
                data: null
            }
        }else{
            const {body:{ email,password }} = ctx.request
            const password_hash =  await bcrypt.hash(password,saltRounds)
            console.log("passowrd_hash",password_hash)
            instance.email = email
            instance.password= password_hash
            const res = await instance.save()
            console.log(res)
            ctx.body = {
                status: 0,
                message: "register successful",
                data: null
            }
        }

    })
module.exports = router
