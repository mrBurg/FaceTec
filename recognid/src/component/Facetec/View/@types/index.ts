import {
  FaceTecIDScanStatus,
  FaceTecSessionStatus,
} from '@component/Facetec/declarations/FaceTecPublicApi';
import { Dispatch, SetStateAction } from 'react';
import { Controller } from './../../Controller';

export type TViewProps = {
  controller: Controller & {
    setAuditTrail: Dispatch<SetStateAction<any>>;
  } & any;
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

export type TViewAuditTrailProps = {
  isCompletelyDone: boolean;
  status: FaceTecIDScanStatus;
  sessionId: string | null;
} & (TFaceTecIDScanResult | TFaceTecSessionResult);
