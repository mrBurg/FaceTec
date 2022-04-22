(function alertIfOldBrowser() {
  try {
    var testBrowserSupport = new Function(
      "'use strict'; const testConstSupport = 0; const testWorkerSupport = Worker.length; const testWasmSupport = WebAssembly.Module;"
    );

    testBrowserSupport();
  } catch (e) {
    alert(
      'Browser not supported: missing basic JS constructs required for FaceTecSDK.js to load.\n\n' +
        navigator.userAgent
    );

    window.location.href = window.location.origin;
  }
})();
