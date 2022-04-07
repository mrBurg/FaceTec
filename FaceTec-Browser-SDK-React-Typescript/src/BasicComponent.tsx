import * as React from "react";
import * as ReactDOM from "react-dom";
import { SampleApp } from "./sample-app/react-ts-sample"

// Update the UI with status
function displayStatus(message: string) {
  document.getElementById("status")!.innerHTML = message;
}

export default class BasicComponent extends React.Component <{}> {
  onLivenessCheckPressed() {
    SampleApp.onLivenessCheckPressed()
  }
  render() {
    return (
      <div>
        <div className="wrapping-box-container">
          <div id="controls" className="controls">
            <button id="liveness-button" className="big-button" onClick={ () => this.onLivenessCheckPressed() }>3D Liveness Check</button>
            <p id="status">Initializing...</p>
          </div>
          <div id="custom-logo-container">
            <img id="facetec-logo" src="../images/facetec_logo.png"/>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <BasicComponent />, document.getElementById("root")
);
