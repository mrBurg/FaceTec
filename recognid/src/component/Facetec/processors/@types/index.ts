export type latestNetworkRequestParamsType = Record<
  | 'idScan'
  | 'sessionId'
  | 'externalDatabaseRefID'
  | 'idScanFrontImage'
  | 'idScanBackImage',
  string
> & {
  minMatchLevel: number;
};
