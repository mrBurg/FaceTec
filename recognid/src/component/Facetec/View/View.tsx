import classNames from 'classnames';
import { TViewProps } from './@types';

import style from './Facetec.module.scss';

function ViewComponent(props: TViewProps) {
  const { controller } = props;

  return (
    <>
      <main className={style.wrappingBoxContainer}>
        <div id="main-interface" className={style.mainInterface}>
          <div id="controls" className={style.controls}>
            {/* <div id="vocal-icon-container">
              <div>
                <img
                  id="vocal-guidance-icon-minimal"
                  alt="vocal-guidance-icon-minimal"
                  // disabled
                  className="vocal-icon"
                  src="/facetec/images/vocal_minimal.png"
                  onClick={() => {
                    //@ts-ignore
                    controller.onVocalGuidanceSettingsButtonPressed();
                  }}
                />
              </div>
              <div>
                <img
                  id="vocal-guidance-icon-full"
                  alt="vocal-guidance-icon-full"
                  // disabled
                  className="vocal-icon vocal-guidance-icon-full display-none"
                  src="/facetec/images/vocal_full.png"
                  onClick={() => {
                    //@ts-ignore
                    controller.onVocalGuidanceSettingsButtonPressed();
                  }}
                />
              </div>
              <div>
                <img
                  id="vocal-guidance-icon-off"
                  alt="vocal-guidance-icon-off"
                  // disabled
                  className="vocal-icon vocal-guidance-icon-off display-none"
                  src="/facetec/images/vocal_off.png"
                  onClick={() => {
                    //@ts-ignore
                    controller.onVocalGuidanceSettingsButtonPressed();
                  }}
                />
              </div>
            </div> */}
            <button
              id="enroll-button"
              // disabled
              onClick={() => {
                controller.onEnrollUserPressed();
              }}
              className={classNames(style.button, style.buttonBig)}
            >
              Enroll User
            </button>
            <button
              id="id-scan-button"
              // disabled
              onClick={() => {
                controller.onPhotoIDMatchPressed();
              }}
              className={classNames(style.button, style.buttonBig)}
            >
              Photo ID Match
            </button>
            <button
              id="audit-trail-button"
              // disabled
              onClick={() => {
                controller.onViewAuditTrailPressed();
              }}
              className={classNames(style.button, style.buttonMedium)}
            >
              View Audit Trail
            </button>
            <p id="status" className={style.status}>
              Initializing...
            </p>
          </div>
        </div>
      </main>

      {/* <style jsx>{``}</style> */}
      {/* <style jsx global>{``}</style> */}
      <button
        onClick={() => {
          controller.SessionResult();
        }}
      >
        SessionResult
      </button>
      <button
        onClick={() => {
          controller.getIDScanResult();
        }}
      >
        IDScanResult
      </button>
      <button
        onClick={() => {
          controller.getScanResultBlob();
        }}
      >
        IDScanResult
      </button>
    </>
  );
}

export const View = ViewComponent;
