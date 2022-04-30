import express from 'express';

import { generateUUId } from '../utilities';

const router = express.Router();

router.post('/facetec', async (_req, res, _next) =>
  res.json({
    ProductionKey: '',
    BaseURL: 'https://api.facetec.com/api/v3.1/biometrics',
    DeviceKeyIdentifier: 'd24ELvA8jZOV4c8HHb4WoP1MSxEX3s0U',
    PublicFaceScanEncryptionKey: `-----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5PxZ3DLj+zP6T6HFgzzk
      M77LdzP3fojBoLasw7EfzvLMnJNUlyRb5m8e5QyyJxI+wRjsALHvFgLzGwxM8ehz
      DqqBZed+f4w33GgQXFZOS4AOvyPbALgCYoLehigLAbbCNTkeY5RDcmmSI/sbp+s6
      mAiAKKvCdIqe17bltZ/rfEoL3gPKEfLXeN549LTj3XBp0hvG4loQ6eC1E1tRzSkf
      GJD4GIVvR+j12gXAaftj3ahfYxioBH7F7HQxzmWkwDyn3bqU54eaiB7f0ftsPpWM
      ceUaqkL2DZUvgN0efEJjnWy5y1/Gkq5GGWCROI9XG/SwXJ30BbVUehTbVcD70+ZF
      8QIDAQAB
      -----END PUBLIC KEY-----`,
    sessionId: generateUUId(),
    idScanId: generateUUId(),
    flow: 0, // 0 - Enroll User, 1 - Photo ID Match
  })
);

export default router;
