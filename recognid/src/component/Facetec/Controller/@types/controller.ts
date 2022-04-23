import {
  EnrollmentProcessor,
  PhotoIDMatchProcessor,
} from '@component/Facetec/processors';

export type TlatestProcessor = PhotoIDMatchProcessor | EnrollmentProcessor;
export type TlatestNetworkResponseStatus = any;
export type TsessionTokenCallback = (token: string) => void;
