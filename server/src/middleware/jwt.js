const jwt = require('jsonwebtoken')

module.exports = {
	// hash userID và role
	// đối số 1 data dùng để hash
	// đối số 2 là privatekey
	// đối số 3 là options => expiresIn: ngày hết hạn của token
	generateAccessToken: (uid, role) =>
		jwt.sign({ _id: uid, role }, process.env.JWT_SECRET, { expiresIn: `2d` }),
	generateRefreshToken: uid =>
		jwt.sign({ _id: uid }, process.env.JWT_SECRET, { expiresIn: `7d` }),
}

// Access toekn dùng để xác thực người dùng, phân quyền người dùng
// Refresh token dùng để cấp mới access token
