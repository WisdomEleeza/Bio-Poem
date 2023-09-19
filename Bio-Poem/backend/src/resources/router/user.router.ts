import express from 'express';
import user from '../controller/user.controller';
const router = express();

router.post('/username', user);

export default router;
