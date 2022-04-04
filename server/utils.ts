import { networkInterfaces, NetworkInterfaceInfo } from 'os';

import { typeNetworkInterfaces } from './@types';

import cfg from './config.json';

export function getLocalIP() {
  const interfaces = networkInterfaces();
  const results = {} as typeNetworkInterfaces;

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

  results.localIP = (results['Wireless network'] ||
    results['Беспроводная сеть'])[0];

  return results;
}
