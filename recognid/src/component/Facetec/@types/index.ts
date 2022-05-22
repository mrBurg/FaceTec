import { FLOW } from '..';
import { TConfigGetProps } from './config';

export * from './config';
export type TFacetecSdk = typeof FaceTecSDK;
export type TFacetecProps = {
  config: TConfigGetProps;
  flow: FLOW;
};
