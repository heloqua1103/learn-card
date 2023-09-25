const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const validator = require('validator')

//shape data
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 30,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: [validator.isEmail],
		},
		phone: {
			type: String,
			required: true,
			minlength: 6,
		},
		password: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 100,
		},
		image: {
			type: String,
		},
		role: {
			type: String,
			enum: ['user', 'admin', 'teacher'],
			default: 'user',
		},
		listCard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'listCard' }],
		refreshToken: {
			type: String,
		},
		passwordChangeAt: {
			type: String,
		},
		passwordResetToken: {
			type: String,
		},
		passwordResetExpires: {
			type: String,
		},
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	},
)

// pre('save') trước khi lưu dữ liệu vào data thì hash password
userSchema.pre('save', async function (next) {
	// nếu password ko thay đổi thì out khỏi hàm call back này
	if (!this.isModified('password')) {
		next()
	}
	const salt = bcrypt.genSaltSync(10)
	this.password = await bcrypt.hash(this.password, salt)
})

userSchema.pre(/^find/, async function (next) {
	// Tìm những tài khoản không active
	this.find({ active: { $ne: false } })
	next()
})

// Định nghĩa 1 method isCorrectPassword
userSchema.methods = {
	isCorrectPassword: async function (password) {
		// so sánh password người dùng nhập vào với password trong db
		return await bcrypt.compare(password, this.password) // trả về true / false
	},
	// Tạo reset password token
	createPasswordChangeToken: function () {
		const resetToken = crypto.randomBytes(32).toString('hex') // hex hệ thập lục phân từ 16 kí tự từ 0 -> 9 và a -> z

		this.passwordResetToken = crypto
			.createHash('sha256')
			.update(resetToken)
			.digest('hex')

		this.passwordResetExpires = Date.now() + 15 * 60 * 1000 // thời gian hiện tại + thêm 15ph

		return resetToken
	},
}

const User = mongoose.model('user', userSchema)

module.exports = User
