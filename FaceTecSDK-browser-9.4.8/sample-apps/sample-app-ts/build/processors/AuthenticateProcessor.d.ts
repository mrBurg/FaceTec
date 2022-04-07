import type { FaceTecSessionResult, FaceTecFaceScanResultCallback, FaceTecFaceScanProcessor } from '../../../../core-sdk/FaceTecSDK.js/FaceTecPublicApi';
import { SampleAppControllerReference } from '../sampleAppControllerReference/SampleAppControllerReference';
export declare class AuthenticateProcessor implements FaceTecFaceScanProcessor {
    latestNetworkRequest: XMLHttpRequest;
    latestSessionResult: FaceTecSessionResult | null;
    success: boolean;
    sampleAppControllerReference: SampleAppControllerReference;
    constructor(sessionToken: string, sampleAppControllerReference: any);
    processSessionResultWhileFaceTecSDKWaits(sessionResult: FaceTecSessionResult, faceScanResultCallback: FaceTecFaceScanResultCallback): void;
    onFaceTecSDKCompletelyDone: () => void;
    isSuccess: () => boolean;
}
