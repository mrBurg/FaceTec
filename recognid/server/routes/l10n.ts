import express from 'express';

import faceTecStrings from './../FaceTecStrings.json';
import faceTecOCRCustomization from './../FaceTecOCRCustomization.json';

const router = express.Router();

router.get('/home', async (_req, res, _next) =>
  res.json({
    title: 'Recognid:Home',
    pageTitle: 'FaceTec Application',
  })
);

router.get('/faceTecStrings', async (_req, res, _next) =>
  res.json(faceTecStrings)
);

router.get('/faceTecOCRCustomization', async (_req, res, _next) =>
  res.json(faceTecOCRCustomization)
);

export default router;
