import type { FaceTecSessionResult, FaceTecFaceScanResultCallback, FaceTecIDScanResult, FaceTecIDScanResultCallback, FaceTecIDScanProcessor } from '../../../../core-sdk/FaceTecSDK.js/FaceTecPublicApi';
import { SampleAppControllerReference } from '../sampleAppControllerReference/SampleAppControllerReference';
export declare class PhotoIDMatchProcessor implements FaceTecIDScanProcessor {
    latestNetworkRequest: XMLHttpRequest;
    latestSessionResult: FaceTecSessionResult | null;
    latestIDScanResult: FaceTecIDScanResult | null;
    success: boolean;
    sampleAppControllerReference: SampleAppControllerReference;
    constructor(sessionToken: string, sampleAppControllerReference: any);
    processSessionResultWhileFaceTecSDKWaits(sessionResult: FaceTecSessionResult, faceScanResultCallback: FaceTecFaceScanResultCallback): void;
    processIDScanResultWhileFaceTecSDKWaits(idScanResult: FaceTecIDScanResult, idScanResultCallback: FaceTecIDScanResultCallback): void;
    onFaceTecSDKCompletelyDone: () => void;
    isSuccess: () => boolean;
}
