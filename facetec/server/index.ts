import express from 'express';
import http from 'http';
import path from 'path';
import ejs from 'ejs';

import cfg from './config.json';
import { serverCallback } from './utils';
import apiHandler from './routes/api';

const expressApp = express();
const httpServer = http.createServer(expressApp);

expressApp
  .set('views', path.join(__dirname, './../src/views'))
  .set('view engine', '.ejs')
  .engine('.ejs', ejs.renderFile)
  .use(express.static(path.join(__dirname, './../static')))
  .use(cfg.urns.api, apiHandler)
  .use(cfg.urns.root, (_req, res) =>
    res.render('./', {
      lang: cfg.lang,
      domData: cfg.domData,
    })
  );

httpServer.listen(cfg.port, serverCallback);
