const combineRouters = require('koa-combine-routers')

const userRouter = require('./user')
const videoRouter = require('./video')
const awsRouter = require('./aws')
const tagRouter = require('./tag')

const router = combineRouters(
    userRouter,
    videoRouter,
    awsRouter,
    tagRouter
)
module.exports = router
