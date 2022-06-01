import {
  FaceTecIDScanStatus,
  FaceTecSessionStatus,
} from '@component/Facetec/declarations/FaceTecPublicApi';
import { TJSON } from '@interface/common';

type TFaceTecIDScanResult = {
  idScan: string | null;
} & Record<'frontImages' | 'backImages', string[]>;

type TFaceTecSessionResult = {
  faceScan: string | null;
  [key: string]: string | FaceTecSessionStatus | null | Record<string, unknown>;
} & Record<'auditTrail' | 'lowQualityAuditTrail', string[]>;

export type TFaceTecAuditTrail = {
  isCompletelyDone: boolean;
  status: FaceTecIDScanStatus;
  sessionId: string | null;
};

export type TAuditTrail = {
  SessionResult: TFaceTecAuditTrail & TFaceTecSessionResult;
  IDScanResult: TFaceTecAuditTrail & TFaceTecIDScanResult;
  documentData: TJSON;
};

export type TViewAuditTrailProps = {
  auditTrail: TAuditTrail;
};
