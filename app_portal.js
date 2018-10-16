require('dotenv').config()
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const parameter = require('koa-parameter')
const Logger = require('koa-logger')
const router = require('./routers')

const port = process.env.PORTAL_PORT
const app = new Koa();
require('koa-validate')(app)

app.use(Logger((str,args)=>{
    console.log('logger output',str)
}))
app.use(bodyParser())
app.use(parameter(app))

app.use(router())

app.listen(port)
