import express from 'express'
import recentPoem from '../controller/recentpoem.controller'
const router = express()

router.get('/recent-poem', recentPoem)

export default router