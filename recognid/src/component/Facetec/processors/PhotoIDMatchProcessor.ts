import { TFacetecSdk } from '../@types';
import { Config } from '../Config';
import { Controller } from '../Controller';
import {
  FaceTecFaceScanProcessor,
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

  constructor(
    sessionToken: string,
    sdk: TFacetecSdk,
    cfg: Config,
    controller: Controller
  ) {
    super(sessionToken, sdk, cfg, controller);

    this.sdk.FaceTecCustomization.setIDScanUploadMessageOverrides(
      'Uploading<br/>Encrypted<br/>ID Scan',
      'Still Uploading...<br/>Slow Connection',
      'Upload Complete',
      'Processing ID Scan',
      'Uploading<br/>Encrypted<br/>Back of ID',
      'Still Uploading...<br/>Slow Connection',
      'Upload Complete',
      'Processing Back of ID',
      'Uploading<br/>Your Confirmed Info',
      'Still Uploading...<br/>Slow Connection',
      'Upload Complete',
      'Processing'
    );

    new this.sdk.FaceTecSession(this, this.sessionToken);
  }

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

    var MinMatchLevel = 3;

    var parameters = {
      idScan: idScanResult.idScan,
      sessionId: idScanResult.sessionId,
      externalDatabaseRefID: this.controller.getLatestEnrollmentIdentifier(),
      minMatchLevel: MinMatchLevel,
    } as TLatestNetworkRequestParams;

    if (idScanResult.frontImages && idScanResult.frontImages[0]) {
      parameters.idScanFrontImage = idScanResult.frontImages[0];
    }

    if (idScanResult.backImages && idScanResult.backImages[0]) {
      parameters.idScanBackImage = idScanResult.backImages[0];
    }

    this.latestNetworkRequest = new XMLHttpRequest();

    this.latestNetworkRequest.open(
      'POST',
      this.cfg.BaseURL + '/match-3d-2d-idscan'
    );

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
      this.sdk.createFaceTecAPIUserAgentString(idScanResult.sessionId)
    );

    this.latestNetworkRequest.onreadystatechange = () => {
      if (this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
        try {
          var responseJSON = JSON.parse(this.latestNetworkRequest.responseText);
          var scanResultBlob = responseJSON.scanResultBlob;

          if (responseJSON.wasProcessed === true) {
            this.sdk.FaceTecCustomization.setIDScanResultScreenMessageOverrides(
              'Your 3D Face<br/>Matched Your ID',
              'Your 3D Face<br/>Matched Your ID',
              'Back of ID Captured',
              'ID Verification<br/>Complete',
              "Face Didn't Match<br/>Highly Enough",
              'ID Document<br/>Not Fully Visible',
              'ID Text Not Legible',
              'ID Type Not Supported<br/>Please Use a Different ID'
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

    this.latestNetworkRequest.send(JSON.stringify(parameters));
  }
}
