import express from 'express';

import cfg from './../config.json';

const router = express.Router();

router.get(cfg.urns.root, (_req, res, next) => {
  res.end('Hello API');

  // const { query } = req;

  /* if (query.new_id == 1) {
    return res.send({
      external_session_id: Math.round(Math.random() * 999999999).toString(),
    });
  } */

  /* if (query.u) {
    return res.send({
      status: 'ok',
    });
  } */

  next();
});

export default router;
