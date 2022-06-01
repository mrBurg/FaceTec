import _ from 'lodash';

import { TFacetecSdk } from '../@types';
import { Config } from '../config/Config';
import { Controller } from '../controllers';
import {
  FaceTecFaceScanProcessor,
  FaceTecFaceScanResultCallback,
  FaceTecIDScanResultCallback,
  FaceTecSessionResult,
} from '../declarations/FaceTecPublicApi';
import { TLatestNetworkRequestParams } from '../@types/processors';

export class Processor {
  success = false;
  latestSessionResult = null;
  latestNetworkRequest = new XMLHttpRequest();

  constructor(
    protected sdk: TFacetecSdk,
    protected cfg: Config,
    protected controller: Controller
  ) {
    new this.sdk.FaceTecSession(
      this as unknown as FaceTecFaceScanProcessor,
      this.cfg.session
    );
  }

  protected async prepareRequest(
    url: string,
    apiUserAgentString: string,
    parameters: TLatestNetworkRequestParams,
    callback: FaceTecIDScanResultCallback
  ) {
    this.latestNetworkRequest = new XMLHttpRequest();
    console.log();

    this.latestNetworkRequest.open('POST', this.cfg.paths.operation + url);

    const headers = {
      'Content-Type': 'application/json',
      // 'X-Device-Key': this.cfg.DeviceKeyIdentifier,
      'X-User-Agent':
        this.sdk.createFaceTecAPIUserAgentString(apiUserAgentString),
    };

    _.each(headers, (item, index) =>
      this.latestNetworkRequest.setRequestHeader(index, item)
    );

    this.latestNetworkRequest.onreadystatechange = async () => {
      if (this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
        try {
          const responseJSON = JSON.parse(
            this.latestNetworkRequest.responseText
          );

          if (responseJSON.scanResultBlob) {
            callback.proceedToNextStep(responseJSON.scanResultBlob);
          } else {
            console.log('Unexpected API response, cancelling out.');
            callback.cancel();
          }
        } catch (err) {
          console.log('Exception while handling API response, cancelling out.');
          callback.cancel();
        }
      }
    };

    this.latestNetworkRequest.onerror = () => {
      console.log('XHR error, cancelling.');
      callback.cancel();
    };

    this.latestNetworkRequest.upload.onprogress = (event) =>
      callback.uploadProgress(event.loaded / event.total);

    this.latestNetworkRequest.send(JSON.stringify(parameters));
  }

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

    const parameters = {
      faceScan: sessionResult.faceScan,
      auditTrailImage: sessionResult.auditTrail[0],
      lowQualityAuditTrailImage: sessionResult.lowQualityAuditTrail[0],
      operationId: this.cfg.id,
      sessionId: sessionResult.sessionId,
    } as TLatestNetworkRequestParams;

    this.prepareRequest(
      this.cfg.paths.enrollment_path,
      sessionResult.sessionId,
      parameters,
      callback
    );

    window.setTimeout(() => {
      if (this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
        return;
      }

      callback.uploadMessageOverride('Still Uploading...');
    }, 6000);
  }
}
