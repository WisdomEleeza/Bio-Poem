import express from 'express'
import getPopularPoems from '../controller/popupular.controller'

const router = express.Router()

router.get('/popular-poems', getPopularPoems)

export default router