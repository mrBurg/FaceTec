import {
  FaceTecIDScanStatus,
  FaceTecSessionStatus,
} from '../../declarations/FaceTecPublicApi';
import { Controller } from './../../Controller';

export type TViewProps = {
  controller: Controller;
};

type TFaceTecIDScanResult = {
  idScan: string | null;
  frontImages: string[];
  backImages: string[];
};

type TFaceTecSessionResult = {
  faceScan: string | null;
  auditTrail: string[];
  lowQualityAuditTrail: string[];
  [key: string]: string | FaceTecSessionStatus | null | {};
};

export type TFaceTecAuditTrail = {
  isCompletelyDone: boolean;
  status: FaceTecIDScanStatus;
  sessionId: string | null;
};

export type TauditTrail = {
  scanResultBlob: string;
  SessionResult: TFaceTecAuditTrail & TFaceTecSessionResult;
  IDScanResult: TFaceTecAuditTrail & TFaceTecIDScanResult;
};

export type TViewAuditTrailProps = TViewProps & {
  auditTrail: TauditTrail;
};
