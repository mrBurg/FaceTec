import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';

import cfg from './config.json';

export const credentials = {
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
};

export const server = express();
server
  .use(express.json({ limit: '50mb' }))
  // .use(express.urlencoded({ limit: '50mb' }))
  .use(cors());
