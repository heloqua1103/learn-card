// khi người dùng lấy API không định nghĩa thì báo lỗi không tìm thấy
const notFound = (req, res, next) => {
	const error = new Error(`Route ${req.originalUrl} not found!`)
	res.status(404) // tạo mã lỗi 405
	next(error) // next lỗi này
}

const errHandler = (error, req, res, next) => {
	// Nếu lỗi status là 200 thì sẽ đổi thành 500 còn nếu nó không phải 200 thì giữ nguyên mã lỗi
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	return res.status(statusCode).json({
		success: false,
		mess: error?.message,
	})
}

module.exports = {
	notFound,
	errHandler,
}
