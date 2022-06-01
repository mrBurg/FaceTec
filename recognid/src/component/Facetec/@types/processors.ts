/**
 * @param operationId тоже самое что и externalDatabaseRefID для Facetec
 */
export type TLatestNetworkRequestParams = Record<
  'sessionId' | 'operationId',
  string
> &
  Record<'idScan' | 'idScanFrontImage' | 'idScanBackImage', string> &
  Record<
    'faceScan' | 'auditTrailImage' | 'lowQualityAuditTrailImage',
    string
  > & {
    minMatchLevel?: number;
  };
