const combineRouters = require('koa-combine-routers')

const userRouter = require('./user')

const router = combineRouters(
    userRouter
)
module.exports = router
