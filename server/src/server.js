require('dotenv').config() // sử dụng dotenv
const express = require('express') // commonjs
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express() // app express
const port = process.env.PORT || 8888 // port
const hostname = process.env.HOST_NAME // hostname

const dbConnect = require('./config/dbConnect')

const initRoutes = require('./routes')

// cấu hình req.body
// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*')
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
// 	)
// 	next()
// })

app.use(
	cors({
		origin: process.env.URL_CLIENT,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		// allowedHeaders: ['Content-Type'],
	}),
)

app.use(express.json()) // đọc data được convert sang json
app.use(express.urlencoded({ extended: true })) // đọc data dạng object được convert sang json
app.use(cookieParser()) // cấu hình có thể đọc được cookie

// kiểm tra kết nối db
dbConnect()

// khai bao route
initRoutes(app)

app.listen(port, hostname, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
