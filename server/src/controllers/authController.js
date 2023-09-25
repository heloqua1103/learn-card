const User = require('../models/user')

const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const {
	generateAccessToken,
	generateRefreshToken,
} = require('../middleware/jwt')

const createSendToken = (response, statusCode, res) => {
	const token = generateAccessToken(response._id, response.role)
	response.password = undefined
	res.status(statusCode).json({
		success: response ? true : false,
		token,
	})
}

const sendMail = require('../utils/sendMail')

module.exports = {
	// Tạo người dùng
	// Nếu registerUser bắt được lỗi thì asyncHandler sẽ trả lỗi ra route
	registerUser: asyncHandler(async (req, res) => {
		// lấy data người dùng truyền lên phía client
		const { email, password, name, phone } = req.body

		// kiểm tra lên dữ liệu dược truyền
		if (!email || !password || !name || !phone)
			return res.status(400).json({
				success: false,
				mess: 'Missing inputs',
			})
		// check email đã được đăng kí hay chưa
		const user = await User.findOne({ email })

		// Nếu tìm thấy email thì response "User đã sử dụng"
		if (user) throw new Error('User has existed')
		else {
			// Tạo dữ liệu trong db
			const newUser = await User.create(req.body)
			// response dữ liệu
			return res.status(200).json({
				success: newUser ? true : false,
				mess: newUser
					? 'Register is successfully. Please go login'
					: 'Something went wrong',
			})
		}
	}),
	// get người dùng
	// Nếu loginUser bắt được lỗi thì asyncHandler sẽ trả lỗi ra route
	loginUser: asyncHandler(async (req, res) => {
		// lấy data người dùng truyền lên phía client
		const { email, password } = req.body

		// kiểm tra lên dữ liệu dược truyền
		if (!email || !password)
			return res.status(400).json({
				success: false,
				mess: 'Missing inputs',
			})

		// check email đã được đăng kí hay chưa
		const response = await User.findOne({ email })

		// nếu có response và response có password trùng password được truyền lên
		if (response && (await response.isCorrectPassword(password))) {
			// response trả về object của mongoose sử dụng toObject để convert sang object thuần
			// loại bỏ đi password và role chỉ lấy tất cả những thằng còn lại
			const { password, role, refreshToken, ...userData } = response.toObject()

			// gọi hàm hash userId and role tạo access token
			const accessToken = generateAccessToken(response._id, role)

			// gọi hàm hash userId tạo refresh token
			const NewrefreshToken = generateRefreshToken(response._id)

			// sau khi có refresh token thì lưu trường refresh token vào trong db bằng userID
			await User.findByIdAndUpdate(
				response._id,
				{
					refreshToken: NewrefreshToken,
				},
				{ new: true }, // new: true có tác dụng sau khi update db thì trả về dữ liệu đã update còn false thì ngược lại
			)

			// lưu refresh token vào cookie
			// đối số 1 là key
			// dối số 2 là value
			// đối số 3 là option
			res.cookie('refreshToken', NewrefreshToken, {
				httpOnly: true, // httpOnly chỉ cho phép đầu có http mới được phép truy cập
				maxAge: 7 * 24 * 60 * 60 * 1000, // maxAge thời gian hết hạn của cookie đổi ra giây
			})

			return res.status(200).json({
				success: true,
				accessToken,
			})
		} else {
			throw new Error('Invalid credentials!')
		}
	}),
	// Cấp mới Token từ cookies so sánh với refreshToken trong db khi Access Token hết hạn
	// Nếu refreshAccessToken bắt được lỗi thì asyncHandler sẽ trả lỗi ra route
	refreshAccessToken: asyncHandler(async (req, res) => {
		// Lấy token từ cookies
		const cookie = req.cookies

		// check xem có token trong cookie hay không
		if (!cookie && !cookie.refreshToken)
			throw new Error('No refresh token in cookies')

		// check token có còn hạn hay không
		const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)

		// check xem token có khớp với token đã lưu trong db hay không
		const response = await User.findOne({
			_id: rs._id,
			refreshToken: cookie.refreshToken,
		})

		// Đã refactor cho phần dưới
		createSendToken(response, 200, res)
		// return res.status(200).json({
		//     success: response ? true : false,
		//     newAccessToken: response
		//         ? generateAccessToken(response._id, response.role)
		//         : 'Refresh token not matched',
		// })
	}),
	// xóa refreshToken trong cookies phía client và refreshToken trong db
	// Nếu logout bắt được lỗi thì asyncHandler sẽ trả lỗi ra route
	logout: asyncHandler(async (req, res) => {
		// Lấy token từ cookies
		const cookie = req.cookies

		// check xem có token trong cookie hay không
		if (!cookie || !cookie.refreshToken)
			throw new Error('No refresh token in cookies')

		// Xóa refresh token ở db
		await User.findOneAndUpdate(
			{ refreshToken: cookie.refreshToken },
			{ refreshToken: '' },
			{ new: true },
		)

		// xóa refresh token ở cookie trình duyệt
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: true,
		})

		return res.status(200).json({
			success: true,
			mess: 'Logout is done',
		})
	}),
	// Client gửi email
	// Server check email có hợp lệ hay không => Gửi mail + kèm theo link ( password change token )
	// Client check mail => click link
	// client gửi api kèm token
	// check token có giống vơi token mà server gửi mail hay không
	// change password
	// Nếu forgotPassword bắt được lỗi thì asyncHandler sẽ trả lỗi ra route
	forgotPassword: asyncHandler(async (req, res) => {
		// lấy email từ query
		const { email } = req.query

		// check xem có email gửi lên từ query hay không
		if (!email) throw new Error('Missing email')

		// kiểm tra xem email có trong db hay không
		const user = await User.findOne({ email })

		// Nếu không email trả ra lỗi
		if (!user) throw new Error('User not found')

		// tạo resetToken
		const resetToken = user.createPasswordChangeToken()

		// lưu resetToken trong db
		await user.save()

		const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 
		phút kể từ bây giờ. <a href=${process.env.URL_CLIENT}/reset-pasword/${resetToken}>Click here</a>`

		const data = {
			email,
			html,
		}

		const rs = await sendMail(data)

		return res.status(200).json({
			success: true,
			rs,
		})
	}),
	// update password = email (Quên mật khẩu)
	// Nếu resetPassword bắt được lỗi thì asyncHandler sẽ trả lỗi ra route
	resetPassword: asyncHandler(async (req, res) => {
		// lấy token và password ở body
		const { password, token } = req.body
		if (!password || !token) throw new Error('Missing inputs')
		// hash password token
		const passwordResetToken = crypto
			.createHash('sha256')
			.update(token)
			.digest('hex')

		// Lấy password token đã hash ra so sánh
		// thời gian gọi API resetPassword lấy passwordResetExpires lưu trong db lớn hơn 15ph so sánh passwordResetExpires thời hiện tại
		// passwordResetExpires được tìm thấy gt phải nhỏ hơn 15ph thì user trả ra mới tính là hợp lệ
		// Nếu gửi sau 15ph thì $gt: Date.now() thì sẽ nhỏ hơn thời gian passwordResetExpires được lưu trong db
		// => passwordResetExpires: { $gt: Date.now() } sẽ sai => user sẽ trả ra null
		const user = await User.findOne({
			passwordResetToken,
			passwordResetExpires: { $gt: Date.now() }, // so sánh thời gian, gt so sánh thời gian lớn thời gian hiện tại
		})

		// check user không có trả về lỗi
		if (!user) throw new Error('Missing email')

		// update password / passwordToken / thời gian password thay dổi / thời gian passwordToken tồn tại
		user.password = password
		user.passwordResetToken = undefined
		user.passwordChangeAt = Date.now()
		user.passwordResetExpires = undefined

		// lưu password vào db
		await user.save()

		return res.status(200).json({
			success: user ? true : false,
			mess: user ? 'Updated password' : 'Something went wrong',
		})
	}),
}
