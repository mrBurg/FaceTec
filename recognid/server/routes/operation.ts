import express from 'express';

import { jsonToQueryString } from './../utils';

const router = express.Router();

let counter = 5;

router.get('/start', async (req, res, _next) => {
  const { query } = req;

  if (counter) {
    counter--;

    // res.status(301);
    // res.location('/');
    console.log('Remaining tries ' + (counter + 1));
    res.end();

    return;
  }

  counter = 5;
  res.send({
    status: 'ok',
    location: '/' + jsonToQueryString(query),
  });
});

export default router;
