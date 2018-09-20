require('dotenv').config()
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const parameter = require('koa-parameter')
const KoaJwt = require('koa-jwt')
const Jwt = require('jsonwebtoken')
const Logger = require('koa-logger')
const router = require('./routers')
const cors = require('koa-cors')

const secret = process.env.JWT_SECRET
const app = new Koa();
require('koa-validate')(app)

app.use(cors())
app.use(Logger((str,args)=>{
    console.log('logger output',str)
}))
app.use(bodyParser())
app.use(parameter(app))
app.use(KoaJwt({secret}).unless({path:[/^\/login/,/^\/register/]}))


app.use(router())


app.listen(3000)
