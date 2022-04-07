import express from 'express';
import http from 'http';
import path from 'path';
import ejs from 'ejs';
// import bodyParser from 'body-parser';

import cfg from './config.json';
import { getLocalIP, serverCallback } from './utils';
import apiHandler from './routes/api';

const expressApp = express();
// const textParser = [expressApp|bodyParser].text({ type: 'text/html' });
// const urlencodedParser = [expressApp|bodyParser].urlencoded({ extended: false });
// const rawParser = [expressApp|bodyParser].raw({ type: 'application/vnd.custom-type' });
// const jsonParser = [expressApp|bodyParser].json({ type: 'application/*+json' });
const httpServer = http.createServer(expressApp);

expressApp
  .set('views', path.join(__dirname, './src/views'))
  .set('view engine', '.ejs')
  .engine('.ejs', ejs.renderFile)
  .use(express.static(path.join(__dirname, './../app')))
  .use(cfg.urns.api, apiHandler)
  .use(cfg.urns.root, (_req, res) =>
    res.render('./', {
      lang: cfg.lang,
      headData: cfg.headData,
    })
  );

httpServer.listen(
  cfg.port,
  serverCallback(cfg.protocol.http, getLocalIP(), cfg.port)
);
