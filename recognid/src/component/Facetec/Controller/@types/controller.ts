import {
  EnrollmentProcessor,
  PhotoIDMatchProcessor,
} from '@component/Facetec/processors';

export type latestProcessorType = PhotoIDMatchProcessor | EnrollmentProcessor;
export type latestNetworkResponseStatusType = any;
export type sessionTokenCallbackType = (token: string) => void;
