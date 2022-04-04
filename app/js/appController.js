const App = (function () {
  var latestEnrollmentIdentifier = '';
  var latestProcessor;
  var latestSessionResult = null;
  var latestIDScanResult = null;
  // Wait for onload to be complete before attempting to access the Browser SDK.
  window.onload = function () {
    AppUtilities.formatUIForDevice();
    // Set a the directory path for other FaceTec Browser SDK Resources.
    FaceTecSDK.setResourceDirectory('resources');
    // Set the directory path for required FaceTec Browser SDK images.
    FaceTecSDK.setImagesDirectory('images');
    // Set your FaceTec Device SDK Customizations.
    ThemeHelpers.setAppTheme(ThemeHelpers.getCurrentTheme());
    // Initialize FaceTec Browser SDK and configure the UI features.
    Config.initializeFromAutogeneratedConfig(
      FaceTecSDK,
      function (initializedSuccessfully) {
        if (initializedSuccessfully) {
          AppUtilities.enableControlButtons();
          // Set the sound files that are to be used for Vocal Guidance.
          AppUtilities.setVocalGuidanceSoundFiles();
          // Set the strings to be used for group names, field names, and placeholder texts for the FaceTec ID Scan User OCR Confirmation Screen.
          AppUtilities.setOCRLocalization();
          AdditionalScreens.setServerUpgradeStyling(
            document.getElementById('controls'),
            exitAdditionalScreen
          );
        }

        AppUtilities.displayStatus(
          FaceTecSDK.getFriendlyDescriptionForFaceTecSDKStatus(
            FaceTecSDK.getStatus()
          )
        );
      }
    );
  };
  // Initiate a 3D Liveness Check.
  function onLivenessCheckPressed() {
    AppUtilities.fadeOutMainUIAndPrepareForSession();
    // Get a Session Token from the FaceTec SDK, then start the 3D Liveness Check.
    getSessionToken(function (sessionToken) {
      latestProcessor = new LivenessCheckProcessor(sessionToken, App);
    });
  }
  // Initiate a 3D Liveness Check, then storing the 3D FaceMap in the Database, also known as "Enrollment".  A random enrollmentIdentifier is generated each time to guarantee uniqueness.
  function onEnrollUserPressed() {
    AppUtilities.fadeOutMainUIAndPrepareForSession();
    // Get a Session Token from the FaceTec SDK, then start the Enrollment.
    getSessionToken(function (sessionToken) {
      latestEnrollmentIdentifier =
        'browser_sample_app_' + AppUtilities.generateUUId();
      latestProcessor = new EnrollmentProcessor(sessionToken, App);
    });
  }
  // Perform 3D to 3D Authentication against the Enrollment previously performed.
  function onAuthenticateUserPressed() {
    // For demonstration purposes, verify that we have an enrollmentIdentifier to Authenticate against.
    if (latestEnrollmentIdentifier.length === 0) {
      AppUtilities.displayStatus(
        'Please enroll first before trying authentication.'
      );
    } else {
      AppUtilities.fadeOutMainUIAndPrepareForSession();
      // Get a Session Token from the FaceTec SDK, then start the 3D to 3D Matching.
      getSessionToken(function (sessionToken) {
        latestProcessor = new AuthenticateProcessor(sessionToken, App);
      });
    }
  }
  // Perform a 3D Liveness Check, then an ID Scan, then Match the 3D FaceMap to the ID Scan.
  function onPhotoIDMatchPressed() {
    AppUtilities.fadeOutMainUIAndPrepareForSession();
    // Get a Session Token from the FaceTec SDK, then start the 3D Liveness Check.  On Success, ID Scanning will start automatically.
    getSessionToken(function (sessionToken) {
      latestEnrollmentIdentifier =
        'browser_sample_app_' + AppUtilities.generateUUId();
      latestProcessor = new PhotoIDMatchProcessor(sessionToken, App);
    });
  }
  // Show the final result with the Session Review Screen.
  var onComplete = function (
    sessionResult,
    idScanResult,
    latestNetworkResponseStatus
  ) {
    latestSessionResult = sessionResult;
    latestIDScanResult = idScanResult;
    if (latestProcessor.isSuccess()) {
      // Show successful message to screen
      AppUtilities.displayStatus('Success');
    } else {
      // Show early exit message to screen.  If this occurs, please check logs.
      // Check for server offline
      if (
        isNetworkResponseServerIsOffline(latestNetworkResponseStatus) === true
      ) {
        showAdditionalScreensServerIsDown();

        return;
      }
    }
    AppUtilities.showMainUI();
  };
  // Check for server down status
  function isNetworkResponseServerIsOffline(networkResponseStatus) {
    return networkResponseStatus >= 500;
  }
  // Set a new customization for FaceTec Browser SDK.
  function onDesignShowcasePressed() {
    ThemeHelpers.showNewTheme();
  }
  function onVocalGuidanceSettingsButtonPressed() {
    AppUtilities.setVocalGuidanceMode();
  }
  // Display audit trail images captured from user's last FaceTec Browser SDK Session (if available).
  function onViewAuditTrailPressed() {
    AppUtilities.showAuditTrailImages(latestSessionResult, latestIDScanResult);
  }
  // Get the Session Token from the server
  function getSessionToken(sessionTokenCallback) {
    // Only handle session token error once
    var sessionTokenErrorHasBeenHandled = false;
    var XHR = new XMLHttpRequest();
    XHR.open('GET', Config.BaseURL + '/session-token');
    XHR.setRequestHeader('X-Device-Key', Config.DeviceKeyIdentifier);
    XHR.setRequestHeader(
      'X-User-Agent',
      FaceTecSDK.createFaceTecAPIUserAgentString('')
    );
    XHR.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        var sessionToken = '';
        try {
          // Attempt to get the sessionToken from the response object.
          sessionToken = JSON.parse(this.responseText).sessionToken;
          // Something went wrong in parsing the response. Return an error.
          if (typeof sessionToken !== 'string') {
            if (sessionTokenErrorHasBeenHandled === false) {
              sessionTokenErrorHasBeenHandled = true;
              if (isNetworkResponseServerIsOffline(XHR.status)) {
                showAdditionalScreensServerIsDown();
              } else {
                onServerSessionTokenError();
              }
            }

            return;
          }
        } catch (_a) {
          // Something went wrong in parsing the response. Return an error.
          if (sessionTokenErrorHasBeenHandled === false) {
            sessionTokenErrorHasBeenHandled = true;
            if (isNetworkResponseServerIsOffline(XHR.status)) {
              showAdditionalScreensServerIsDown();
            } else {
              onServerSessionTokenError();
            }
          }

          return;
        }
        AppUtilities.hideLoadingSessionToken();
        sessionTokenCallback(sessionToken);
      }
    };
    // Wait 3s, if the request is not completed yet, show the session token loading screen
    window.setTimeout(function () {
      if (XHR.readyState !== XMLHttpRequest.DONE) {
        AppUtilities.showLoadingSessionToken();
      }
    }, 3000);
    XHR.onerror = function () {
      // Something went wrong in the XHR request
      if (sessionTokenErrorHasBeenHandled === false) {
        sessionTokenErrorHasBeenHandled = true;
        if (isNetworkResponseServerIsOffline(XHR.status)) {
          showAdditionalScreensServerIsDown();
        } else {
          onServerSessionTokenError();
        }
      }
    };
    XHR.send();
  }

  function showAdditionalScreensServerIsDown() {
    AdditionalScreens.showServerUpGradeView();
  }

  function onServerSessionTokenError() {
    AppUtilities.handleErrorGettingServerSessionToken();
  }

  var getLatestEnrollmentIdentifier;
  getLatestEnrollmentIdentifier = function () {
    return latestEnrollmentIdentifier;
  };

  var clearLatestEnrollmentIdentifier;
  clearLatestEnrollmentIdentifier = function () {
    latestEnrollmentIdentifier = '';
  };

  function exitAdditionalScreen() {
    AdditionalScreens.exitAdditionalScreen(AppUtilities.showMainUI);
  }

  return {
    onLivenessCheckPressed: onLivenessCheckPressed,
    onEnrollUserPressed: onEnrollUserPressed,
    onAuthenticateUserPressed: onAuthenticateUserPressed,
    onPhotoIDMatchPressed: onPhotoIDMatchPressed,
    onDesignShowcasePressed: onDesignShowcasePressed,
    onComplete: onComplete,
    getLatestEnrollmentIdentifier: getLatestEnrollmentIdentifier,
    clearLatestEnrollmentIdentifier: clearLatestEnrollmentIdentifier,
    onVocalGuidanceSettingsButtonPressed: onVocalGuidanceSettingsButtonPressed,
    onViewAuditTrailPressed: onViewAuditTrailPressed,
    latestSessionResult: latestSessionResult,
    latestIDScanResult: latestIDScanResult,
  };
})();
