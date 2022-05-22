import { Dispatch, SetStateAction } from 'react';

import { Processor } from './../../processors/Processor';
import { EnrollmentProcessor, PhotoIDMatchProcessor } from '../../processors';
import { TauditTrail } from '../../View/@types';

export type TLatestProcessor = EnrollmentProcessor | PhotoIDMatchProcessor;
export type TLatestNetworkResponseStatus = number;
export type TSessionTokenCallback = (token: string) => void;
export type TControllerProps = {
  setAuditTrail: Dispatch<SetStateAction<TauditTrail>>;
  setInitialized: Dispatch<SetStateAction<boolean>>;
};

export type TProcessor = {
  new (...args: ConstructorParameters<typeof Processor>): TLatestProcessor;
};
