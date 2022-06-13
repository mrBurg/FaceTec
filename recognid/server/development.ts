import https from 'https';
import http from 'http';

import { serverCallback } from './utils';
import cfg from './config.json';
import { credentials, server } from './server';
import configHandler from './routes/config';
import operationHandler from './routes/operation';

server
  .use('/api/config', configHandler)
  .use('/api/operation', operationHandler);

const httpServer = http.createServer(server);
httpServer.listen(
  cfg.port.developmentHttp,
  serverCallback('http', cfg.port.developmentHttp)
);

const httpsServer = https.createServer(credentials, server);
httpsServer.listen(
  cfg.port.developmentHttps,
  serverCallback('https', cfg.port.developmentHttps)
);
