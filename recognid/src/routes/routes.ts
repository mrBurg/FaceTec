// URL [protocol:]//[domain]/[path]
// URN [domain]/[path]
// URI /[path]

export enum URIS {
  AUDIT_TRAIL = '/audit-trail',
  LIVENESS = '/liveness',
  PROCESSING = '/processing',
  ADDRESS_DETECTION = '/address-detection',
  ADDRESS_DETECTION_RESULT = '/address-detection-result',
}

export enum API_URIS {
  PROCESSING = '/api/operation/start',
  OPERATION_ENROLLMENT = '/api/operation/enrollment-3d',
  OPERATION_IDSCAN = '/api/operation/match-3d-2d-idscan',
  GET_LOGO = '/api/operation/config/logo', // /${partner}
  GET_LOCALIZATION = '/api/operation/config/file', // /${partner}
  GET_CONFIG = '/api/operation/config/field?key=facetec', // [key=base_url, key=device_key]

  // только для локальной разработки
  OPERATION_INIT = '/api/operation/init',
  SESSION_RESULT = '/api/facetec/sessionResult',
  ID_SCAN_RESULT = '/api/facetec/IDScanResult',
  DOCUMENT_DATA = '/api/facetec/documentData',
  GET_LINK = '/api/config/getLink',
}
