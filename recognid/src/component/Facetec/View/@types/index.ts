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

export type TauditTrail = {
  isCompletelyDone: boolean;
  status: FaceTecIDScanStatus;
  sessionId: string | null;
} & (TFaceTecIDScanResult | TFaceTecSessionResult);

export type TViewAuditTrailProps = {
  auditTrail: TauditTrail;
};
