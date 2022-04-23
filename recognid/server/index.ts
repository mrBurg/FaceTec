// import https from 'https';
import http from 'http';
import express from 'express';
import next from 'next';
import cors from 'cors';

import { serverCallback } from './utils';
import l10nHandler from './routes/l10n';
import configHandler from './routes/config';

import cfg from './config.json';

const nextApp = next({ dev: true });
const handle = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();
  const server = express();
  server
    .use(express.json())
    .use(cors())
    .use('/api/config', configHandler)
    .use('/api/static', l10nHandler)
    .all('*', (req, res) => handle(req, res));

  const httpServer = http.createServer(server);

  httpServer.listen(cfg.port.http, serverCallback('http', cfg.port.http));

  /* const httpsServer = https.createServer({ key: '', cert: '' }, server);

  httpsServer.listen(
    cfg.port.https,
    serverCallback('https', cfg.port.https)
  ); */
})();
