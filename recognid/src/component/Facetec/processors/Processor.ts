import { API_URIS } from '@root/routes';
import axios from 'axios';
import _ from 'lodash';
import { ENROLLMENT_3D } from '..';

import { TFacetecSdk } from '../@types';
import { Config } from '../config/Config';
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

  protected async prepareRequest(
    url: string,
    apiUserAgentString: string,
    parameters: TLatestNetworkRequestParams,
    callback: FaceTecIDScanResultCallback
  ) {
    this.latestNetworkRequest = new XMLHttpRequest();
    this.latestNetworkRequest.open('POST', this.cfg.BaseURL + url);

    const headers = {
      'Content-Type': 'application/json',
      'X-Device-Key': this.cfg.DeviceKeyIdentifier,
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

          const response = await axios.post(
            API_URIS.UPLOAD_DATA + url, // Указать реальный URL нашего сервиса
            {
              ...responseJSON,
              wasProcessed: responseJSON.wasProcessed,
              scanResultBlob: responseJSON.scanResultBlob,
            },
            { headers }
          );

          if (response.data.wasProcessed) {
            callback.proceedToNextStep(response.data.scanResultBlob);
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
