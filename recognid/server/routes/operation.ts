import express from 'express';
import cfg from './../config.json';

const router = express.Router();

let counter = 0;

router.get('/start', async (req, res, _next) => {
  const { query } = req;
  counter++;

  console.log(
    `Number of tries ${counter} with params ${JSON.stringify(query)}`
  );

  return res.status(cfg.status.temporaryRedirect).json({
    location: `/processing?id=${Math.round(Math.random() * 1000000)}`,
  });
});

export default router;
