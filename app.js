const Koa = require('koa')
const KoaJwt = require('koa-jwt')
const Jwt = require('jsonwebtoken')
const Logger = require('koa-logger')
const router = require('./routers')
const cors = require('koa-cors')
const MongoClient = require('mongodb').MongoClient



const secret = "2AACE74965CF6D73C9218410D3EE939C2993C7F8D9F99CFCB2AB430D6E8358B0"
const app = new Koa();
app.use(cors())
app.use(Logger((str,args)=>{
    console.log('logger output',str)
}))

console.log('token',Jwt.sign({
},secret))
//app.use(KoaJwt({secret}))

app.use(router())


//var url = "mongodb://localhost:27017/koa-admin"
//MongoClient.connect(url,(err,db)=>{
//    if(err) throw err;
////    console.log("connected successfully to server",db)
//})
app.listen(3000)
