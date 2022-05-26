import express from 'express';
import http from 'http';
// import https from 'https';

const router = express.Router();

router.post('/facetec', async (_req, res, _next) =>
  res.json({
    ProductionKey: '',
    BaseURL: 'https://api.facetec.com/api/v3.1/biometrics',
    // DeviceKeyIdentifier: 'd24ELvA8jZOV4c8HHb4WoP1MSxEX3s0U',
    DeviceKeyIdentifier: 'dAVhYPNGPVRnbjLJRjDJhg1c7oJgl1Js',
    PublicFaceScanEncryptionKey: `-----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5PxZ3DLj+zP6T6HFgzzk
      M77LdzP3fojBoLasw7EfzvLMnJNUlyRb5m8e5QyyJxI+wRjsALHvFgLzGwxM8ehz
      DqqBZed+f4w33GgQXFZOS4AOvyPbALgCYoLehigLAbbCNTkeY5RDcmmSI/sbp+s6
      mAiAKKvCdIqe17bltZ/rfEoL3gPKEfLXeN549LTj3XBp0hvG4loQ6eC1E1tRzSkf
      GJD4GIVvR+j12gXAaftj3ahfYxioBH7F7HQxzmWkwDyn3bqU54eaiB7f0ftsPpWM
      ceUaqkL2DZUvgN0efEJjnWy5y1/Gkq5GGWCROI9XG/SwXJ30BbVUehTbVcD70+ZF
      8QIDAQAB
      -----END PUBLIC KEY-----`,
  })
);

router.post('/getOperation', async (_req, res, _next) => {
  const httpReq = http.request(
    {
      protocol: 'http:',
      host: 'ec2-3-73-76-117.eu-central-1.compute.amazonaws.com',
      port: 20305,
      path: '/api/operation/init',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic bWRmaW46cXdlcnR5MTIzNDU=',
      },
    },
    (response) => {
      // response.setEncoding('utf8');
      response.on('data', (chunk) => res.json(JSON.parse(chunk)));
      response.on('end', () =>
        console.log('HTTP request "Operation init" end')
      );
    }
  );

  httpReq.on('error', (err) => console.log(err));
  httpReq.end();
});

router.post('/getLink', async (req, res, _next) => {
  const { body } = req;

  const httpReq = http.request(body.operation_url, (response) => {
    const { headers } = response;

    res.json(headers.location);
    console.log('HTTP request "Get link" end');
  });

  httpReq.on('error', (err) => console.log(err));
  httpReq.end();
});

export default router;
