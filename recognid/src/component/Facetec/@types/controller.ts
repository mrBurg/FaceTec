import { Dispatch, SetStateAction } from 'react';

import { EnrollmentProcessor, PhotoIDMatchProcessor } from '../processors';
import { Processor } from '../processors/Processor';

export type TLatestProcessor = EnrollmentProcessor | PhotoIDMatchProcessor;
export type TLatestNetworkResponseStatus = number;
export type TSessionTokenCallback = (token: string) => void;
export type TControllerProps = {
  setInitialized: Dispatch<SetStateAction<boolean>>;
};

export type TProcessor = {
  new (...args: ConstructorParameters<typeof Processor>): TLatestProcessor;
};
