import express from 'express';
import http from 'http';
import path from 'path';
import _ from 'lodash';
// import bodyParser from 'body-parser';

import cfg from './config.json';
import { getLocalIP } from './utils';
import apiHandler from './routes/api';
import { typeHosts, typeNetworkInterfaces } from './@types';

const expressApp = express();
// const textParser = [expressApp|bodyParser].text({ type: 'text/html' });
// const urlencodedParser = [expressApp|bodyParser].urlencoded({ extended: false });
// const rawParser = [expressApp|bodyParser].raw({ type: 'application/vnd.custom-type' });
// const jsonParser = [expressApp|bodyParser].json({ type: 'application/*+json' });
const httpServer = http.createServer(expressApp);

const serverCallback = (
  (err) =>
  (protocol: string, hostsData: typeNetworkInterfaces, port: string) => {
    const wrapper = (data: string) =>
      `\n    \x1b[102m\x1b[30m${data}\x1b[0m\x1b[92m`;

    let hosts = `${wrapper('["localhost"]')}`;

    if (err) {
      throw err;
    }

    for (let item in hostsData) {
      hosts += `${wrapper(JSON.stringify(hostsData[item]))}\x1b[0m\t ${item}`;
    }

    console.log(
      `\x1b[92m${protocol} App ready on =>\n  host ->${hosts}\n\x1b[92m  port ->${wrapper(
        `["${port}"]`
      )}\n\x1b[0m`
    );

    return _.noop;
  }
)();

expressApp
  .use(express.static(path.join(__dirname, './../app')))
  .use(cfg.urns.api, apiHandler);

httpServer.listen(
  cfg.port,
  serverCallback(cfg.protocol.http, getLocalIP(), cfg.port)
);
