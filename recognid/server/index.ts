import https from 'https';
import http from 'http';
import next from 'next';

import { serverCallback } from './utils';
import facetecHandler from './routes/facetec';
import cfg from './config.json';
import { credentials, server } from './server';

server.use('/api/facetec', facetecHandler);

const nextApp = next({ dev: process.env.ENVIRONMENT == 'development' });
const handle = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();

  server.all('*', (req, res) => handle(req, res));

  const httpServer = http.createServer(server);
  httpServer.listen(cfg.port.http, serverCallback('http', cfg.port.http));

  const httpsServer = https.createServer(credentials, server);
  httpsServer.listen(cfg.port.https, serverCallback('https', cfg.port.https));
})();
