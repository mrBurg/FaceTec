import express from 'express';

const router = express.Router();

router.get('/home', async (_req, res, _next) =>
  res.json({
    title: 'FaceTec Application',
  })
);

export default router;
