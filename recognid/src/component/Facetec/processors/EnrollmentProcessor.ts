import { TFacetecSdk } from '../@types';
import { Config } from '../config/Config';
import { Controller } from '../controllers';
import { FaceTecFaceScanProcessor } from '../declarations/FaceTecPublicApi';
import { Processor } from './Processor';

export class EnrollmentProcessor
  extends Processor
  implements FaceTecFaceScanProcessor
{
  constructor(
    sessionToken: string,
    sdk: TFacetecSdk,
    cfg: Config,
    controller: Controller
  ) {
    super(sessionToken, sdk, cfg, controller);
  }

  onFaceTecSDKCompletelyDone() {
    this.success = this.latestSessionResult.isCompletelyDone;

    if (!this.success) {
      this.controller.clearLatestEnrollmentIdentifier();
    }

    this.controller.onComplete(
      this.latestSessionResult,
      null,
      this.latestNetworkRequest.status
    );
  }
}
