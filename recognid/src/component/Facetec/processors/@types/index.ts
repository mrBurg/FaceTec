export type TLatestNetworkRequestParams = Record<
  | 'idScan'
  | 'sessionId'
  | 'externalDatabaseRefID'
  | 'idScanFrontImage'
  | 'idScanBackImage',
  string
> & {
  minMatchLevel: number;
};
