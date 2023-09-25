const User = require('../models/user')
const ListCard = require('../models/listCard')
const asyncHandler = require('express-async-handler')
const factory = require('./handlerController')

module.exports = {
	// tạo người dùng bởi admin
	createUser: asyncHandler(async (req, res) => {
		const newUser = await User.create(req.body)

		return res.status(201).json({
			success: newUser ? true : false,
			mes: newUser ? newUser : 'Can not create!!',
		})
	}),
	// lấy thông tin của người dùng
	// Nếu getUser bắt được lỗi thì asyncHandler sẽ trả lỗi ra route
	getUser: asyncHandler(async (req, res) => {
		const { _id } = req.user
		const { populate } = req.query

		// tìm người dùng trong db thông qua _id và loại bỏ vài trường: refreshToken, role, password
		const user = await User.findById(_id)
			.populate(populate)
			.select('-refreshToken -role -password')

		return res.status(200).json({
			success: user ? true : false,
			mes: user ? user : 'User not found',
		})
	}),
	// Người dùng xóa account nhưng dữ liệu vẫn còn chỉ là account bị ẩn đi
	deleteMe: asyncHandler(async (req, res) => {
		const { _id } = req.user

		const response = await User.findByIdAndUpdate(_id, {
			active: false,
		})

		res.status(404).json({
			success: true,
			data: null,
		})
	}),
	// Lấy tất cả người dùng, role: admin mới có thể lấy được
	// Nếu getAllUsers bắt được lỗi thì asyncHandler sẽ trả lỗi ra route
	getAllUsers: asyncHandler(async (req, res) => {
		// Lấy tất cả người dùng trong db và loại bỏ vài trường: refreshToken, role, password
		const response = await User.find().select('-refreshToken -role -password')

		return res.status(200).json({
			success: response ? true : false,
			users: response ? response : "Can't get data",
		})
	}),
	// Xóa người dùng bằng id
	// Nếu deleterUser bắt được lỗi thì asyncHandler sẽ trả lỗi ra route
	deleterUser: asyncHandler(async (req, res) => {
		// lấy id từ query
		const { _id } = req.query

		// Nếu không có id trả ra lỗi
		if (!_id) throw new Error('Missing input')

		// tìm id trong db và delete
		const response = await User.findByIdAndDelete(_id)

		return res.status(200).json({
			success: response ? true : false,
			deletedUser: response
				? `User with email ${response.email} deleted`
				: 'No user deleted',
		})
	}),
	// Update người dùng bằng id
	// Nếu updateUser bắt được lỗi thì asyncHandler sẽ trả lỗi ra route
	updateUser: asyncHandler(async (req, res) => {
		// lấy id từ decode
		const { _id } = req.user

		// Nếu không có id hoặc req.body là một Object rỗng không có key có độ dài mảng là = 0 thì trả ra lỗi
		if (!_id || Object.keys(req.body).length === 0)
			throw new Error('Missing input')

		// tìm id trong db và update theo req.body
		const response = await User.findByIdAndUpdate(_id, req.body, {
			new: true, // trả về dữ liệu đã update
		}).select('-role -password -refreshToken') // loại bỏ đi trường: role, password, refreshToken khi trả data về phía client

		return res.status(200).json({
			success: response ? true : false,
			updatedUser: response ? response : 'Some thing went wrong',
		})
	}),
	// Update người dùng bởi admin
	// Nếu updateUser bắt được lỗi thì asyncHandler sẽ trả lỗi ra route
	updateUserByAdmin: asyncHandler(async (req, res) => {
		// lấy userId từ params (url)
		const { uid } = req.params

		// Nếu req.body là một Object rỗng không có key có độ dài mảng là = 0 thì trả ra lỗi
		if (Object.keys(req.body).length === 0) throw new Error('Missing input')

		// tìm userId trong db và update theo req.body
		const response = await User.findByIdAndUpdate(uid, req.body, {
			new: true, // trả về dữ liệu đã update
		}).select('-role -password -refreshToken') // loại bỏ đi trường: role, password, refreshToken khi trả data về phía client

		return res.status(200).json({
			success: response ? true : false,
			updatedUser: response ? response : 'Some thing went wrong',
		})
	}),
	uploadAvatarUser: asyncHandler(async (req, res) => {
		const { uid } = req.params
		if (!req.file) throw new Error('Mising inputs')

		const response = await User.findByIdAndUpdate(
			uid,
			{
				image: req.file.path,
			},
			{
				new: true, // trả về dữ liệu đã update
			},
		).select('-role -password -refreshToken')

		return res.status(200).json({
			success: response ? true : false,
			updatedUser: response ? response : "Can't upload avatar",
		})
	}),
}
