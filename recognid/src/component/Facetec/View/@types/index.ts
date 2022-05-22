import {
  FaceTecIDScanStatus,
  FaceTecSessionStatus,
} from '../../declarations/FaceTecPublicApi';
import { Controller } from '../../controllers';
import { TJSON } from '@interface/common';

export type TViewProps = {
  controller: Controller;
  initialized: boolean;
};

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

export type TauditTrail = {
  SessionResult: TFaceTecAuditTrail & TFaceTecSessionResult;
  IDScanResult: TFaceTecAuditTrail & TFaceTecIDScanResult;
  documentData: TJSON;
};

export type TViewAuditTrailProps = Pick<TViewProps, 'controller'> & {
  auditTrail: TauditTrail;
};
