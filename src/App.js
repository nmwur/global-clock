import React, { Component } from "react";
import styled from "styled-components";

import { ClockList } from "./ClockList";
import { ControlPanel } from "./ControlPanel";

class App extends Component {
  state = {
    shift: 0,
    editMode: false
  };

  componentDidMount() {
    this.app.scrollTo(50, 0);
  }

  render() {
    const { shift, editMode } = this.state;

    return (
      <StyledApp ref={el => (this.app = el)}>
        <ClockList shift={shift} editMode={editMode} />
        <Scrubber />
        <ControlPanel
          isChangeShiftDisabled={editMode}
          isResetShiftDisabled={shift === 0}
          editMode={editMode}
          incrementShift={this.incrementShift.bind(this)}
          decrementShift={this.decrementShift.bind(this)}
          resetShift={this.resetShift.bind(this)}
          toggleEditMode={this.toggleEditMode.bind(this)}
        />
      </StyledApp>
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

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
    this.resetShift();
  }
}

const StyledApp = styled.div`
  position: relative;
  background-color: #cddcf0;
  font-family: monospace;
`;

const Scrubber = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 1;
  width: 1px;
  height: 100%;
  border-left: 1px dashed #b4c8d7;
`;

export default App;
