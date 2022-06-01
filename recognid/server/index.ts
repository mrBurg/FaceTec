import https from 'https';
import http from 'http';
import express from 'express';
import next from 'next';
import cors from 'cors';
import { readFileSync } from 'fs';

import { serverCallback } from './utils';
import l10nHandler from './routes/l10n';
import configHandler from './routes/config';
import facetecHandler from './routes/facetec';
import operationHandler from './routes/operation';

import cfg from './config.json';

const nextApp = next({ dev: true });
const handle = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();
  const server = express();
  server
    .use(express.json({ limit: '50mb' }))
    // .use(express.urlencoded({ limit: '50mb' }))
    .use(cors())
    .use('/api/config', configHandler)
    .use('/api/static', l10nHandler)
    .use('/api/facetec', facetecHandler)
    .use('/api/operation', operationHandler)
    .all('*', (req, res) => handle(req, res));

  const httpServer = http.createServer(server);

  httpServer.listen(cfg.port.http, serverCallback('http', cfg.port.http));

  const httpsServer = https.createServer(
    {
      key: readFileSync(
        cfg.certificate.key /* {
        encoding: cfg.certificate.encoding,
      } */
      ),
      cert: readFileSync(
        cfg.certificate.cert /* {
        encoding: cfg.certificate.encoding,
      } */
      ),
    },
    server
  );

  httpsServer.listen(cfg.port.https, serverCallback('https', cfg.port.https));
})();
