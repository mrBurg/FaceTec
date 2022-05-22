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

export default router;
