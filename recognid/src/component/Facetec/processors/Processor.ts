import axios from 'axios';

import { TFacetecSdk } from '../@types';
import { Config } from '../config/Config';
import { ENROLLMENT_3D } from '../constants';
import { Controller } from '../controllers';
import {
  FaceTecFaceScanProcessor,
  FaceTecFaceScanResultCallback,
  FaceTecIDScanResultCallback,
  FaceTecSessionResult,
} from '../declarations/FaceTecPublicApi';
import { TLatestNetworkRequestParams } from './@types';

export class Processor {
  success = false;
  latestSessionResult = null;
  latestNetworkRequest = new XMLHttpRequest();

  constructor(
    protected sessionToken: string,
    protected sdk: TFacetecSdk,
    protected cfg: Config,
    protected controller: Controller
  ) {
    new this.sdk.FaceTecSession(
      this as unknown as FaceTecFaceScanProcessor,
      this.sessionToken
    );
  }

  async prepareRequest(
    url: string,
    apiUserAgentString: string,
    parameters: TLatestNetworkRequestParams,
    callback: FaceTecIDScanResultCallback
  ) {
    const serviceUrl = this.cfg.BaseURL + url;

    // console.log('parameters', parameters);

    try {
      const response = await axios.post(serviceUrl, parameters, {
        headers: {
          'Content-Type': 'application/json',
          'X-Device-Key': this.cfg.DeviceKeyIdentifier,
          'X-User-Agent':
            this.sdk.createFaceTecAPIUserAgentString(apiUserAgentString),
        },
      });

      console.log('response', response);

      if (response.data.wasProcessed) {
        callback.proceedToNextStep(response.data.scanResultBlob);
      } else {
        console.log('Unexpected API response, cancelling out.');
        callback.cancel();
      }
    } catch (_a) {
      console.log('Exception while handling API response, cancelling out.');
      callback.cancel();
    }
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
      sessionId: sessionResult.sessionId,
      externalDatabaseRefID: this.controller.getLatestEnrollmentIdentifier(),
    } as TLatestNetworkRequestParams;

    this.prepareRequest(
      ENROLLMENT_3D,
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
