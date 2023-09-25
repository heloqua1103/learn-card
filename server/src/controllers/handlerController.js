const asyncHandler = require('express-async-handler')

// File này hiện tại trì hoãn chưa tiếp tục được
exports.createOne = Model =>
	asyncHandler(async (req, res, next) => {
		const doc = await Model.create(req.body)
		console.log(doc)
		return res.status(201).json({
			success: doc ? true : false,
			res: doc ? doc : 'Can not create!!',
		})
	})

exports.getOne = Model =>
	asyncHandler(async (req, res, next) => {
		const { _id } = req.user

		// tìm người dùng trong db thông qua _id và loại bỏ vài trường: refreshToken, role, password
		const doc = await Model.findById(_id).select(
			'-refreshToken -role -password',
		)

		return res.status(200).json({
			success: doc ? true : false,
			res: doc ? doc : 'Document not found',
		})
	})
