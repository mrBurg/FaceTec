import express from 'express';

import sessionResult from './../data/sessionResult.json';
import IDScanResult from './../data/IDScanResult.json';
import documentData from './../data/documentData.json';

const router = express.Router();

router.post('/sessionResult', async (_req, res, _next) =>
  res.json(sessionResult)
);

router.post('/IDScanResult', async (_req, res, _next) =>
  res.json(IDScanResult)
);

router.post('/documentData', async (_req, res, _next) =>
  res.send(documentData)
);

router.post('/enrollment-3d', async (req, res, _next) => {
  console.log(req.body);

  res.send(req.body);
});

router.post('/match-3d-2d-idscan', async (req, res, _next) => {
  console.log(req.body);

  res.send(req.body);
});

export default router;
