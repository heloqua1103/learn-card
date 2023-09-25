const express = require('express')

const routerAPI = express.Router()

const {
	createUser,
	getUser,
	deleteMe,
	getAllUsers,
	deleterUser,
	updateUser,
	updateUserByAdmin,
	uploadAvatarUser,
} = require('../controllers/userController')

const {
	registerUser,
	loginUser,
	refreshAccessToken,
	logout,
	forgotPassword,
	resetPassword,
} = require('../controllers/authController')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken')
const uploader = require('../config/cloudinary.config')

// CRUD | Create - Read - Update - Delete
routerAPI.post('/register', registerUser)
routerAPI.post('/login', loginUser)
routerAPI.post('/refreshtoken', refreshAccessToken)
routerAPI.get('/forgotpassword', forgotPassword)
routerAPI.put('/resetpassword', resetPassword)
routerAPI.get('/logout', logout)

// Cần đăng nhập để làm
routerAPI.use(verifyAccessToken)

routerAPI.route('/current').get(getUser).delete(deleteMe).put(updateUser)
routerAPI.put(
	'/upload-avatar/:uid',
	uploader.single('avatar'),
	uploadAvatarUser,
)

// Cần vai trò admin để làm
routerAPI.use(isAdmin)

routerAPI.route('/').post(createUser).get(getAllUsers).delete(deleterUser)
routerAPI.put('/:uid', updateUserByAdmin)

module.exports = routerAPI
