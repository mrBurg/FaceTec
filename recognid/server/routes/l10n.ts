import express from 'express';

import stringsCustomization from './../data/stringsCustomization.json';
import OCRCustomization from './../data/OCRCustomization.json';

const router = express.Router();

router.get('/home', async (_req, res, _next) =>
  res.json({
    title: 'Recognid:Home',
    pageTitle: 'Click for start FaceTec Application',
  })
);

router.get('/stringsCustomization', async (_req, res, _next) =>
  res.json(stringsCustomization)
);

router.get('/OCRCustomization', async (_req, res, _next) =>
  res.json(OCRCustomization)
);

export default router;
