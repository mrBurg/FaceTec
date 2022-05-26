export type TLatestNetworkRequestParams = Record<
  'sessionId' | 'externalDatabaseRefID',
  string
> &
  Record<'idScan' | 'idScanFrontImage' | 'idScanBackImage', string> &
  Record<
    'faceScan' | 'auditTrailImage' | 'lowQualityAuditTrailImage',
    string
  > & {
    minMatchLevel: number;
  };
