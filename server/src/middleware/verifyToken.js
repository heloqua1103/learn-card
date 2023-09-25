const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

module.exports = {
	// verify access token thường sẽ được gửi trong header
	// Nếu verifyAccessToken bắt được lỗi thì asyncHandler sẽ trả lỗi ra route
	verifyAccessToken: asyncHandler(async (req, res, next) => {
		// headers: { authorization: Bearer token } (Quy định chung)
		// phân biệt với access token khác
		// Bearer token. Check xem token có bắt đầu bằng Bearer không
		if (req?.headers?.authorization?.startsWith('Bearer')) {
			// lấy token từ headers có key: authorization và value: Bearer token
			// dùng split cắt value bằng dấu cách. Lúc này trả ra 1 mảng có phần tử đầu là Bearer và phần tử 2 là token
			// chỉ phần tử thứ 2 trong mảng là [1] để lấy token
			const token = req.headers.authorization.split(' ')[1]

			jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
				// verify có lỗi thì err sẽ có lỗi, ngược lại err sẽ là null
				if (err)
					// lỗi 401 là lỗi không có xác thực
					return res.status(401).json({
						success: false,
						mes: 'Invalid access token',
					})

				// decode là dữ liệu đã hash lúc đầu
				// console.log(decode)
				req.user = decode

				next()
			})
		} else {
			return res.status(401).json({
				success: false,
				mess: 'Require authentication!!!',
			})
		}
	}),
	// phân quyền admin
	isAdmin: asyncHandler((req, res, next) => {
		// lấy role từ req.user (decode dữ liệu hash từ verifyAccessToken)
		const { role } = req.user

		// Nếu role không phải admin thì sẽ trả ra lỗi
		if (role !== 'admin')
			return res.status(401).json({
				success: false,
				mess: 'REQUIE ADMIN ROLE',
			})

		next()
	}),
}
