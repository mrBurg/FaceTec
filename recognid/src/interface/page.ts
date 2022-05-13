import { TJSON } from './common';

type TDomains = Record<'domain' | 'defaultLocale', string> & {
  locales: string[];
};

export type TPageProps = {
  context: {
    locales: string[];
    defaultLocale: string;
    domains: TDomains[];
  };
  staticData: TJSON;
};
