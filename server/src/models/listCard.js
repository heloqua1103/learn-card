const mongoose = require('mongoose')

const listCardSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		translateText: {
			type: String,
			required: true,
		},
		example: {
			type: String,
		},
		typeDifficult: {
			type: Boolean,
			required: true,
		},
		progress: {
			type: Number,
			enum: [0, 1, 2, 3, 4],
			default: 0,
		},
		target: {
			type: String,
		},
		createDate: {
			type: String,
		},
		folder: {
			type: String,
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	},
)

// listCardSchema.pre('save', async function (next) {
// 	const listCardPromises = this.listCard.map(
// 		async id => await User.findById(id),
// 	)
// 	this.listCard = await Promise.all(listCardPromises)
// 	next()
// })

const ListCard = mongoose.model('listCard', listCardSchema)

module.exports = ListCard
