import Link from 'next/link';
import classNames from 'classnames';
import _ from 'lodash';
import Script from 'next/script';

import style from './Home.module.scss';

import { typeHomeComponentProps, typeGridItem } from './@types';

function HomeComponent(props: typeHomeComponentProps) {
  const { title, description, grid, footer } = props.static;

  return (
    <>
      {_.map(
        [
          '/facetec/FaceTecStrings.js',
          '/facetec/Config.js',
          '/facetec/FaceTecSDK.js',
          '/facetec/browser-check.js',
          '/facetec/utilities/AppUIFunctions.js',
          '/facetec/utilities/AppUtilities.js',
          '/facetec/utilities/ThemeHelpers.js',
          '/facetec/utilities/AdditionalScreens.js',
          '/facetec/utilities/SoundFileUtilities.js',
          '/facetec/processors/EnrollmentProcessor.js',
          '/facetec/processors/PhotoIDMatchProcessor.js',
          '/facetec/appController.js',
        ],
        (item, index) => (
          <Script key={index} strategy="beforeInteractive" src={item} />
        )
      )}
      <div className={classNames('container', style.container)}>
        <main>
          <div className="wrapping-box-container">
            <div id="main-interface">
              <div id="controls">
                <div id="vocal-icon-container">
                  <div>
                    <img
                      id="vocal-guidance-icon-minimal"
                      alt="vocal-guidance-icon-minimal"
                      // disabled
                      className="vocal-icon"
                      src="/facetec/images/vocal_minimal.png"
                      onClick={() => {
                        //@ts-ignore
                        App.onVocalGuidanceSettingsButtonPressed();
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
                        App.onVocalGuidanceSettingsButtonPressed();
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
                        App.onVocalGuidanceSettingsButtonPressed();
                      }}
                    />
                  </div>
                </div>
                <button
                  id="enroll-button"
                  // disabled
                  onClick={() => {
                    //@ts-ignore
                    App.onEnrollUserPressed();
                  }}
                  className="big-button"
                >
                  Enroll User
                </button>
                <button
                  id="id-scan-button"
                  // disabled
                  onClick={() => {
                    //@ts-ignore
                    App.onPhotoIDMatchPressed();
                  }}
                  className="big-button"
                >
                  Photo ID Match
                </button>
                <button
                  id="audit-trail-button"
                  // disabled
                  onClick={() => {
                    //@ts-ignore
                    App.onViewAuditTrailPressed();
                  }}
                  className="medium-button"
                >
                  View Audit Trail
                </button>
                <p id="status">Initializing...</p>
              </div>
              <div id="additional-screen" /* display="flex" */>
                <div id="additional-screen-image-and-text">
                  <img
                    id="additional-screen-logo"
                    alt="additional-screen-logo"
                  />
                  <h2>Server Upgrade In Progress</h2>
                  <div id="additional-screen-text"></div>
                </div>
                <button
                  id="additional-screen-button"
                  className="big-button browser-button"
                >
                  OK
                </button>
              </div>
            </div>
            <div id="custom-logo-container">
              <img src="/facetec/images/FaceTec_Logo.png" alt="FaceTec_Logo" />
            </div>
          </div>
        </main>
        <footer>
          <span id="copy-right-section">
            <p id="copy-right" className="footer-element-margin">
              &copy; 2021 FaceTec, Inc. &thinsp;&middot;&thinsp; Multiple US &
              International Patents Granted&thinsp;&middot;&thinsp; All Rights
              Reserved
            </p>
            <hr className="hr display-none footer-element-margin" />
            <p className="footer-element-margin">
              <Link href="https://dev.facetec.com/policies/terms.html">
                <a target="_blank">Terms &amp; Conditions</a>
              </Link>
              &thinsp;&middot;&thinsp;
              <Link href="https://dev.facetec.com/policies/privacy_site.html">
                <a target="_blank">Site Privacy Policy</a>
              </Link>
              &thinsp;&middot;&thinsp;
              <Link href="https://dev.facetec.com/policies/privacy_sdk.html">
                <a target="_blank">SDK Privacy Policy</a>
              </Link>
            </p>
          </span>
        </footer>
        <div id="copy-right-length">
          &copy; 2021 FaceTec, Inc. &thinsp;&middot;&thinsp; Multiple US &
          International Patents Granted&thinsp;&middot;&thinsp; All Rights
          Reserved
        </div>
        <div className="loading-session-token-container">
          <p id="loading-session-token-text">Network Connection Slow...</p>
        </div>
        <div id="theme-transition-overlay">
          <img
            id="theme-transition-overlay-img"
            // onerror="this.style.display='none'"
            // onload="this.style.display='block'"
            src=""
            alt=""
          />
        </div>

        {/* <style jsx>{``}</style> */}
        {/* <style jsx global>{``}</style> */}
      </div>
    </>
  );
}

export const Home = HomeComponent;
