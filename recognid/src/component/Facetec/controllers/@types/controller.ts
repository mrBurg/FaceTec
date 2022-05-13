import { Dispatch, SetStateAction } from 'react';

import { EnrollmentProcessor, PhotoIDMatchProcessor } from '../../processors';
import { TauditTrail } from '../../View/@types';

export type TLatestProcessor = PhotoIDMatchProcessor | EnrollmentProcessor;
export type TLatestNetworkResponseStatus = number;
export type TSessionTokenCallback = (token: string) => void;
export type TControllerProps = {
  setAuditTrail: Dispatch<SetStateAction<TauditTrail>>;
  setInitialized: Dispatch<SetStateAction<boolean>>;
};
