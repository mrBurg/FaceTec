// URL [protocol:]//[domain]/[path]
// URN [domain]/[path]
// URI /[path]

export enum URLS {
  BASE_HTTP_URL = 'http://localhost:8080',
  BASE_HTTPS_URL = 'https://localhost:8443',
  CONTAINER = 'http://ec2-3-73-76-117.eu-central-1.compute.amazonaws.com:20305',
  DOMAIN = 'https://recid.finmdtest.com',
}

export enum URIS {
  AUDIT_TRAIL = '/audit-trail',
  ROOT = '/',
  HOME = '/home',
}

export enum API_URIS {
  SESSION_RESULT = '/api/facetec/sessionResult', // только для локальной разработки
  ID_SCAN_RESULT = '/api/facetec/IDScanResult', // только для локальной разработки
  DOCUMENT_DATA = '/api/facetec/documentData', // только для локальной разработки

  GET_LINK = '/api/config/getLink', // только для локальной разработки

  STATIC = '/api/static', // Изменить на оригинальный /api/operation/start?id=${operation_id}

  PROCESSING = '/api/operation/start', // Изменить на оригинальный /api/operation/start?id=${operation_id}
  OPERATION_INIT = '/api/operation/init', // только для локальной разработки
  OPERATION = '/api/operation', // /${process url}
  GET_LOGO = '/api/operation/config/logo', // /${partner}
  GET_LOCALIZATION = '/api/operation/config/file', // /${partner}
  GET_CONFIG = '/api/operation/config/field?key=facetec', // [key=base_url, key=device_key]
}
