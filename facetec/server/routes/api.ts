import express from 'express';

import cfg from './../config.json';

/* const textParser = express.text({ type: 'text/html' }); */
/* const urlencodedParser = express.urlencoded({
  extended: false,
}); */
/* const rawParser = express.raw({
  type: 'application/vnd.custom-type',
}); */
/* const jsonParser = express.json({
  type: 'application/*+json',
}); */

const router = express.Router();

router.get(cfg.urns.root, (req, res, next) => {
  const { query, params } = req;

  if (query.get) {
    res.write(JSON.stringify(query));

    return res.end();
  }

  next();
});

router.post(cfg.urns.root, express.json(), (req, res, next) => {
  const { body } = req;

  if (body.post) {
    res.write(JSON.stringify(body));

    return res.end();
  }

  next();
});

export default router;
