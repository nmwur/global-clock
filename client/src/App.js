import React, { Component } from "react";
import styled from "styled-components";

import { ClockList } from "./ClockList";
import { ControlPanel } from "./ControlPanel";

const BACKEND_PATH = "/clocks";

class App extends Component {
  state = {
    editMode: false,
    clockList: []
  };

  componentDidMount() {
    this.updateClockList();
  }

  render() {
    return (
      <StyledApp>
        <ClockList
          clockList={this.state.clockList}
          addClock={this.addClock.bind(this)}
          deleteClock={this.deleteClock.bind(this)}
          editMode={this.state.editMode}
          onRef={ref => (this.clockList = ref)}
        />
        <ControlPanel
          editMode={this.state.editMode}
          toggleEditMode={this.toggleEditMode.bind(this)}
          resetShift={this.resetShift.bind(this)}
        />
      </StyledApp>
    );
  }

  resetShift() {
    this.clockList.scrollToNow();
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
    this.resetShift();
  }

  async updateClockList() {
    const clockList = await this.fetchClockList();
    this.setState({ clockList });
  }

  async fetchClockList() {
    try {
      const data = await fetch(BACKEND_PATH);
      return await data.json();
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async addClock(city, timezone) {
    await fetch(`${BACKEND_PATH}?city=${city}&timezone=${timezone}`, {
      method: "POST"
    });

    // or return something from fetch? or just setstate?
    this.updateClockList();
  }

  async deleteClock(id) {
    await fetch(`${BACKEND_PATH}/${id}`, { method: "DELETE" });

    const clockList = this.state.clockList.filter(clock => clock.id !== id);
    this.setState({ clockList });
  }
}

const StyledApp = styled.div`
  position: relative;
  background-color: #cddcf0;
  font-family: monospace;
`;

export default App;
