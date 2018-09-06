const Koa = require('koa')
const logger = require('koa-logger')
const app = new Koa();

app.use(logger((str,args)=>{
    console.log(str)
}))
app.use(async ctx=>{
    ctx.body = "hello"
})
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/koa-admin"
MongoClient.connect(url,(err,db)=>{
    if(err) throw err;
    console.log("connected successfully to server")
})
app.listen(3000)
