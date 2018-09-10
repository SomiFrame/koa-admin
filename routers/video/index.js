const bcrypt = require('bcrypt')
const Router = require('koa-router')
const router = new Router()
const Models= require('../../mongodb/models')

const UserModel= Models.M_User
const instance = new UserModel()

const saltRounds = 10

const secret = "2AACE74965CF6D73C9218410D3EE939C2993C7F8D9F99CFCB2AB430D6E8358B0"

router
    .post('/video',async(ctx,next)=>{
        console.log('ctx',ctx.request.body)
    })

module.exports = router
