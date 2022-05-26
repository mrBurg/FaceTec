import { MATCH_3D_2D_IDSCAN } from '..';
import {
  FaceTecIDScanProcessor,
  FaceTecIDScanResult,
  FaceTecIDScanResultCallback,
} from '../declarations/FaceTecPublicApi';
import { TLatestNetworkRequestParams } from './@types';
import { Processor } from './Processor';

export class PhotoIDMatchProcessor
  extends Processor
  implements FaceTecIDScanProcessor
{
  latestIDScanResult = null;

  onFaceTecSDKCompletelyDone() {
    if (this.latestIDScanResult) {
      this.success = this.latestIDScanResult.isCompletelyDone;
    }

    if (!this.success) {
      this.controller.clearLatestEnrollmentIdentifier();
    }

    this.controller.onComplete(
      this.latestSessionResult,
      this.latestIDScanResult,
      this.latestNetworkRequest.status
    );
  }

  processIDScanResultWhileFaceTecSDKWaits(
    idScanResult: FaceTecIDScanResult,
    callback: FaceTecIDScanResultCallback
  ) {
    this.latestIDScanResult = idScanResult;

    if (idScanResult.status !== this.sdk.FaceTecIDScanStatus.Success) {
      console.log('ID Scan was not completed successfully, cancelling.');
      this.latestNetworkRequest.abort();
      this.latestNetworkRequest = new XMLHttpRequest();
      callback.cancel();

      return;
    }

    const parameters = {
      idScan: idScanResult.idScan,
      sessionId: idScanResult.sessionId,
      externalDatabaseRefID: this.controller.getLatestEnrollmentIdentifier(),
      minMatchLevel: 3,
    } as TLatestNetworkRequestParams;

    if (idScanResult.frontImages && idScanResult.frontImages[0]) {
      parameters.idScanFrontImage = idScanResult.frontImages[0];
    }

    if (idScanResult.backImages && idScanResult.backImages[0]) {
      parameters.idScanBackImage = idScanResult.backImages[0];
    }

    this.prepareRequest(
      MATCH_3D_2D_IDSCAN,
      idScanResult.sessionId,
      parameters,
      callback
    );
  }
}
