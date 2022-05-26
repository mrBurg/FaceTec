import express from 'express';

const router = express.Router();

let counter = 0;

router.get('/start', async (req, res, _next) => {
  counter++;

  console.log(`${counter}:${JSON.stringify(req.query)}`);

  if (counter >= 5) {
    counter = 0;
    res.status(301);
    // res.location('/');
    res.redirect('/');
    res.end();
  }
});

export default router;
