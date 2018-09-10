const combineRouters = require('koa-combine-routers')

const userRouter = require('./user')
const videoRouter = require('./video')

const router = combineRouters(
    userRouter,
    videoRouter
)
module.exports = router
