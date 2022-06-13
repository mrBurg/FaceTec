import { TJSON } from '@interface/common';
import { API_URIS, URIS } from '@root/routes';
import _ from 'lodash';

export function jsonToQueryString(
  json: TJSON,
  ...restProps: (boolean | string)[]
) {
  let encode = false;
  let symbol = '?';

  _.each(restProps, (item) => {
    switch (true) {
      case _.isBoolean(item):
        encode = item as boolean;

        break;
      case _.isString(item):
        symbol = item as string;

        break;
    }
  });

  return (
    symbol +
    _.map(json, (value: string, key: string) => {
      if (!value) {
        return false;
      }

      if (encode) {
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);
      }

      return `${key}=${value}`;
    })
      .filter((value) => value)
      .join('&')
  );
}

export function replaceString(data: string, which: string, to: string) {
  return String(data).replace(which, to);
}

export function makeUrl(...args: (URIS | API_URIS | string)[]) {
  return args.join('');
}
