const userRouter = require('./user')
const listCardRouter = require('./listCard')

const { notFound, errHandler } = require('../middleware/errHandler')

const initRoutes = app => {
	app.use('/api/user', userRouter)
	app.use('/api/listCard', listCardRouter)

	app.use(notFound) // khi api nào người dùng sử dụng không trùng với những api trên thì hàm notFound sẽ đc chạy
	app.use(errHandler) // hứng tất cả các lỗi phát sinh của tất cả các API phía trên trả về phía client
}

module.exports = initRoutes
