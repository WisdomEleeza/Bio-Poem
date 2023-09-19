import express from 'express';
import image from '../controller/background'

const router = express.Router();

router.post('/background', image);

export default router;
