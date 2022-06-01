import { ReactElement } from 'react';
import { FLOW } from '..';
import { TConfigGetProps, TPaths } from './config';

export * from './config';
export * from './controller';
export * from './processors';
export * from './view';
export type TFacetecSdk = typeof FaceTecSDK;

export type TFacetecProps = {
  config: TConfigGetProps;
  flow: FLOW;
  paths: TPaths;
  preloader?: ReactElement;
};
