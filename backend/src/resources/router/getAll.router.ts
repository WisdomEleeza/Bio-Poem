import express from 'express';
import fetchAll from '../controller/getAll.controller';
const router = express();

router.get('/all-poems', fetchAll);

export default router;
