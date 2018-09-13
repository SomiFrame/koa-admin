const combineRouters = require('koa-combine-routers')

const userRouter = require('./user')
const videoRouter = require('./video')
const awsRouter = require('./aws')

const router = combineRouters(
    userRouter,
    videoRouter,
    awsRouter
)
module.exports = router
