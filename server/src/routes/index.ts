import express from 'express';

const router = express.Router();

router.use('/', (req, res, next) => {
  res.status(200).send('hello');
});

export default router;
