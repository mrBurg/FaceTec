import App from './App.js';

function ready() {
  var secretInternals =
    ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

  const createRoot = function (c, o) {
    secretInternals.usingClientEntryPoint = true;
    try {
      return ReactDOM.createRoot(c, o);
    } finally {
      secretInternals.usingClientEntryPoint = false;
    }
  };

  /* const hydrateRoot = function (c, h, o) {
    secretInternals.usingClientEntryPoint = true;
    try {
      return ReactDOM.hydrateRoot(c, h, o);
    } finally {
      secretInternals.usingClientEntryPoint = false;
    }
  }; */

  const container = document.getElementById('root');
  const root = createRoot(container);

  root.render(App);
}

document.addEventListener('DOMContentLoaded', ready);

/*
[
  "js/FaceTecStrings.js",
  "js/FaceTecSDK.js",
  "js/processors/PhotoIDMatchProcessor.js",
  "js/utilities/AppUIFunctions.js",
  "js/utilities/AppUtilities.js",
  "js/utilities/ThemeHelpers.js",
  "js/utilities/AdditionalScreens.js",
  "js/utilities/SoundFileUtilities.js",
  "js/appController.js"
]
*/
