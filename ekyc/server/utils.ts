import { networkInterfaces, NetworkInterfaceInfo } from 'os';
import _ from 'lodash';

import cfg from './config.json';

export function getLocalIP() {
  const interfaces = networkInterfaces();
  const results = {};

  for (const [name, value] of Object.entries(interfaces)) {
    for (const {
      family,
      internal,
      address,
    } of value as NetworkInterfaceInfo[]) {
      if (family === cfg.versionIP && !internal) {
        if (!results[name]) {
          results[name] = [];
        }

        results[name].push(address);
      }
    }
  }

  return results;
}

export const serverCallback = ((err) => (protocol: string, port: number) => {
  const wrapper = (data: string) =>
    `\n    \x1b[102m\x1b[30m${data}\x1b[0m\x1b[92m`;
  const hostsData = getLocalIP();
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
})();
