import React, { Component } from "react";
import styled from "styled-components";
import uniqid from "uniqid";

import { ClockList } from "./ClockList";
import { ControlPanel } from "./ControlPanel";
import { Loader } from "./ui/Loader";
import defaultClockList from "./defaultClockList.json";
import { colors } from "ui/constants";

const BACKEND_PATH = "/clocks";

class App extends Component {
  state = {
    isEditMode: false,
    isLoggedIn: false,
    clockList: [],
    isDefaultClockListModified: false,
    isLoading: false
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
          isEditMode={this.state.isEditMode}
          onRef={ref => (this.clockList = ref)}
        />
        <ControlPanel
          isEditMode={this.state.isEditMode}
          isLoggedIn={this.state.isLoggedIn}
          toggleEditMode={this.toggleEditMode.bind(this)}
          resetShift={this.resetShift.bind(this)}
          updateClockList={this.updateClockList.bind(this)}
        />
        {this.state.isLoading && <Loader />}
      </StyledApp>
    );
  }

  resetShift() {
    this.clockList.scrollToNow();
  }

  setShift(time) {
    this.clockList.scrollTo(time);
  }

  toggleEditMode() {
    this.setState({ isEditMode: !this.state.isEditMode });
    this.resetShift();
  }

  async updateClockList() {
    try {
      this.setState({ isLoading: true });

      const response = await fetch(BACKEND_PATH, {
        credentials: "same-origin"
      });

      const isLoggedIn = this.checkIfSignedIn(response.status);
      if (isLoggedIn) {
        const clockList = await response.json();
        this.setState({ isLoggedIn, clockList });
      } else {
        this.setState({ isLoggedIn, clockList: defaultClockList });
      }

      this.setState({ isLoading: false });
    } catch (err) {
      console.error(err);
    }
  }

  async addClock(city, timezone) {
    try {
      this.setState({ isLoading: true });

      const response = await fetch(
        `${BACKEND_PATH}?city=${city}&timezone=${timezone}`,
        {
          method: "POST"
        }
      );

      const isLoggedIn = this.checkIfSignedIn(response.status);
      if (isLoggedIn) {
        const addedClock = await response.json();
        const clockList = [...this.state.clockList, addedClock];
        this.setState({ clockList });
      } else {
        const clockList = [
          ...this.state.clockList,
          {
            id: uniqid(),
            city,
            timezone
          }
        ];
        this.setState({ clockList });
      }

      this.setState({ isLoading: false });
    } catch (err) {
      console.error(err);
    }
  }

  deleteClock(id) {
    fetch(`${BACKEND_PATH}/${id}`, { method: "DELETE" });

    const clockList = this.state.clockList.filter(clock => clock.id !== id);
    this.setState({ clockList });
  }

  checkIfSignedIn(statusCode) {
    return statusCode === 204
      ? false
      : statusCode === 200
        ? true
        : this.state.isLoggedIn;
  }
}

const StyledApp = styled.div`
  position: relative;
  background-color: ${colors.bg};
  font-family: monospace;
`;

export default App;
