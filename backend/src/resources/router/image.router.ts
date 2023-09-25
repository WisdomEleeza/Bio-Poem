import express from 'express';
import getAllImage from '../controller/getImage.controller';
const router = express();

router.get('/all-images', getAllImage);

export default router;