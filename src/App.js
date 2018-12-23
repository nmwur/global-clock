import React, { Component } from "react";
import styled from "styled-components";

import { ClockList } from "./ClockList";
import { ControlPanel } from "./ControlPanel";

class App extends Component {
  state = {
    editMode: false
  };

  render() {
    const { editMode } = this.state;

    return (
      <StyledApp ref={el => (this.app = el)}>
        <ClockList editMode={editMode} />
        <Scrubber />
        <ControlPanel
          editMode={editMode}
          toggleEditMode={this.toggleEditMode.bind(this)}
          resetShift={this.resetShift.bind(this)}
        />
      </StyledApp>
    );
  }

  resetShift() {
    // reimplement
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
  border-left: 2px dashed #ffb432;
`;

export default App;
