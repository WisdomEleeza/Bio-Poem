import express from 'express';
import downvotes from '../controller/downvote.controller';

const router = express();

router.post('/:id/downvote', downvotes);

export default router;
