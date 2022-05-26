// URL [protocol]://[domain]/[path]
// URN [domain]/[path]
// URI /[path]

export enum URLS {
  ORIGIN = 'https://recid.finmdtest.com',
  CONTAINER = 'http://ec2-3-73-76-117.eu-central-1.compute.amazonaws.com:20305',
  LOCAL = 'http://localhost',
  DOMAIN = 'http://ec2-3-73-76-117.eu-central-1.compute.amazonaws.com:20305',
}

export enum URIS {
  AUDIT_TRAIL = '/audit-trail',
  HOME = '/',
}

export enum API_URIS {
  GET_LINK = '/api/config/getLink', // только для локальной разработки
  OPERATION_INIT = '/api/operation/init', // только для локальной разработки
  UPLOAD_DATA = '/api/facetec', // только для локальной разработки
  GET_LOGO = '/api/operation/config/logo', // /${partner}
  GET_LOCALIZATION = '/api/operation/config/file', // /${partner}
  GET_CONFIG = '/api/operation/config/field?key=facetec', // [key=base_url, key=device_key]
  PROCESSING = '/api/operation/start', // Изменить на оригинальный /api/operation/start?id=${operation_id}
}

// export const ENROLLMENT_3D = '/enrollment-3d';
// export const MATCH_3D_2D_IDSCAN = '/match-3d-2d-idscan';
