import React, { Component } from "react";

import { ClockList } from "./ClockList";
import { ControlPanel } from "./ControlPanel";

class App extends Component {
  state = {
    shift: 0,
    clockList: [
      {
        city: "La Crosse",
        timezone: -360
      },
      {
        city: "Moscow",
        timezone: 180
      }
    ]
  };

  render() {
    return (
      <React.Fragment>
        <ClockList shift={this.state.shift} clockList={this.state.clockList} />
        <ControlPanel
          incrementShift={this.incrementShift.bind(this)}
          decrementShift={this.decrementShift.bind(this)}
          resetShift={this.resetShift.bind(this)}
        />
      </React.Fragment>
    );
  }

  incrementShift() {
    this.setState({ shift: this.state.shift + 1 });
  }

  decrementShift() {
    this.setState({ shift: this.state.shift - 1 });
  }

  resetShift() {
    this.setState({ shift: 0 });
  }
}

export default App;
