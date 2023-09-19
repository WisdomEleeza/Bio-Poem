import express from 'express'
import upvote from '../controller/upvote.controller'

const router = express.Router()

router.post('/:id/upvote', upvote)

export default router