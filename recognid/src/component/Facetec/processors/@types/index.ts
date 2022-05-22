export type TLatestNetworkRequestParams = Record<
  | 'idScan'
  | 'sessionId'
  | 'externalDatabaseRefID'
  | 'idScanFrontImage'
  | 'idScanBackImage',
  string
> & {
  minMatchLevel: number;
} & Record<
    | 'faceScan'
    | 'auditTrailImage'
    | 'lowQualityAuditTrailImage'
    | 'sessionId'
    | 'externalDatabaseRefID',
    string
  >;
