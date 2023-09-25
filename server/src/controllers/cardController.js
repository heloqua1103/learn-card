const ListCard = require('../models/listCard')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

module.exports = {
	CRUDCard: asyncHandler(async (req, res) => {
		const { _id } = req.user
		const { type, data } = req.body

		let newResult

		const user = await User.findById(_id).select(
			'-refreshToken -role -password -passwordResetToken -passwordResetExpires',
		)

		if (type === 'create-card') {
			let result = await ListCard.create(data)

			user.listCard.push(result)

			newResult = await user.save()
		}

		if (type === 'remove-card') {
			await ListCard.findByIdAndDelete(data._id)

			user.listCard.pull(data)

			newResult = await user.save()
		}

		if (type === 'update-card') {
			newResult = await ListCard.findByIdAndUpdate(data._id, data, {
				new: true,
			})
		}

		return res.status(200).json({
			success: newResult ? true : false,
			data: newResult ? newResult : 'Can not create card',
		})
	}),
	getAllCard: asyncHandler(async (req, res) => {
		const { _id } = req.user

		const page = +req.query.page || 1
		const limit = +req.query.limit || 6
		const skip = (page - 1) * limit

		const id = []

		const user = await User.findById(_id).select(
			'-refreshToken -role -password -passwordResetToken -passwordResetExpires',
		)

		for (let i = 0; i < user.listCard.length; i++) {
			id.push(user.listCard[i].toString().split('"').join())
		}

		const result = await ListCard.find({ _id: { $in: id } })
			.skip(skip)
			.limit(limit)

		return res.status(200).json({
			success: user && result ? true : false,
			data: user && result ? result : 'Can not get all card',
			userData: user && result ? user : 'Can not find user',
		})
	}),
}
