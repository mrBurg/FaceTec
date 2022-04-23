import { TFacetecSdk } from '../@types';
import { Config } from '../Config';
import { Controller } from '../Controller';
import {
  FaceTecFaceScanResultCallback,
  FaceTecSessionResult,
} from '../declarations/FaceTecPublicApi';

export class Processor {
  success = false;
  latestSessionResult = null;
  latestNetworkRequest = new XMLHttpRequest();

  constructor(
    protected sessionToken: string,
    protected sdk: TFacetecSdk,
    protected cfg: Config,
    protected controller: Controller
  ) {}

  isSuccess() {
    return this.success;
  }

  processSessionResultWhileFaceTecSDKWaits(
    sessionResult: FaceTecSessionResult,
    callback: FaceTecFaceScanResultCallback
  ) {
    this.latestSessionResult = sessionResult;

    if (
      sessionResult.status !==
      this.sdk.FaceTecSessionStatus.SessionCompletedSuccessfully
    ) {
      console.log(
        'Session was not completed successfully, cancelling.  Session Status: ' +
          this.sdk.FaceTecSessionStatus[sessionResult.status]
      );
      this.latestNetworkRequest.abort();
      callback.cancel();

      return;
    }

    this.latestNetworkRequest = new XMLHttpRequest();

    this.latestNetworkRequest.open('POST', this.cfg.BaseURL + '/enrollment-3d');

    this.latestNetworkRequest.setRequestHeader(
      'Content-Type',
      'application/json'
    );

    this.latestNetworkRequest.setRequestHeader(
      'X-Device-Key',
      this.cfg.DeviceKeyIdentifier
    );

    this.latestNetworkRequest.setRequestHeader(
      'X-User-Agent',
      this.sdk.createFaceTecAPIUserAgentString(sessionResult.sessionId)
    );

    this.latestNetworkRequest.onreadystatechange = () => {
      if (this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
        try {
          const responseJSON = JSON.parse(
            this.latestNetworkRequest.responseText
          );
          const scanResultBlob = responseJSON.scanResultBlob;

          if (responseJSON.wasProcessed) {
            this.sdk.FaceTecCustomization.setOverrideResultScreenSuccessMessage(
              'Liveness\nConfirmed'
            );

            callback.proceedToNextStep(scanResultBlob);
          } else {
            console.log('Unexpected API response, cancelling out.');
            callback.cancel();
          }
        } catch (_a) {
          console.log('Exception while handling API response, cancelling out.');
          callback.cancel();
        }
      }
    };

    this.latestNetworkRequest.onerror = function () {
      console.log('XHR error, cancelling.');
      callback.cancel();
    };

    this.latestNetworkRequest.upload.onprogress = function (event) {
      var progress = event.loaded / event.total;
      callback.uploadProgress(progress);
    };

    this.latestNetworkRequest.send(
      JSON.stringify({
        faceScan: sessionResult.faceScan,
        auditTrailImage: sessionResult.auditTrail[0],
        lowQualityAuditTrailImage: sessionResult.lowQualityAuditTrail[0],
        sessionId: sessionResult.sessionId,
        externalDatabaseRefID: this.controller.getLatestEnrollmentIdentifier(),
      })
    );

    window.setTimeout(() => {
      if (this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
        return;
      }

      callback.uploadMessageOverride('Still Uploading...');
    }, 6000);
  }
}
