import joi from 'joi'

export const emailJoi = joi.string().pattern(new RegExp('gmail.com')).required()

export const passwordJoi = joi
	.string()
	.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
	.required()

export const nameJoi = joi.string().min(3).max(30).required()

export const phoneJoi = joi.string().min(6).required()
