const express = require('express')

const routerAPI = express.Router()

const { CRUDCard, getAllCard } = require('../controllers/cardController')

const { verifyAccessToken } = require('../middleware/verifyToken')

routerAPI.use(verifyAccessToken)
routerAPI.route('/').post(CRUDCard).get(getAllCard)

module.exports = routerAPI
