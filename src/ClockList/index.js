import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { addMinutes, addDays } from "date-fns";

import { Clock, getTimeScale } from "./Clock";
import { AddClockButton } from "./AddClockButton";
import { AddClockForm } from "./AddClockForm";

const BACKEND_URL = "https://equable-stop.glitch.me/clocks";

export class ClockList extends React.Component {
  state = {
    time: new Date(),
    shift: 0,
    isShiftBeingReset: false,
    addClockMode: false,
    clockList: []
  };

  componentDidMount() {
    this.scrollToNow();
    this.getClockList();
  }

  render() {
    const { editMode } = this.props;
    const { addClockMode, time, shift, clockList } = this.state;

    return (
      <ScrollWrapper
        ref={el => (this.scrollWrapper = el)}
        onScroll={this.onScroll.bind(this)}
      >
        <StyledClockList ref={el => (this.clockList = el)}>
          <Clock city={`Local time`} time={time} shift={shift} />
          {clockList.map(clock => (
            <Clock
              id={clock.id}
              city={clock.city}
              time={getRemoteTime(time, clock.timezone)}
              shift={shift}
              timezone={clock.timezone}
              editMode={editMode}
              deleteClock={this.deleteClock.bind(this)}
              key={clock.id}
            />
          ))}
          {editMode && <AddClockButton addClock={this.addClock.bind(this)} />}
          {addClockMode && (
            <AddClockForm
              onSubmit={this.onAddClockSubmit.bind(this)}
              closeForm={this.closeAddClockForm.bind(this)}
            />
          )}
        </StyledClockList>
      </ScrollWrapper>
    );
  }

  async scrollToNow() {
    await this.setState({ isShiftBeingReset: true });

    const { scrollWidth, clientWidth } = this.scrollWrapper;
    const defaultPosition = scrollWidth / 2 - clientWidth / 2;
    this.scrollWrapper.scrollLeft = defaultPosition;
  }

  onScroll() {
    const { scrollLeft, clientWidth } = this.scrollWrapper;
    const scrolledPosition = scrollLeft + clientWidth / 2;

    const domain = [addDays(new Date(), -2), addDays(new Date(), 2)];
    const timeScale = getTimeScale(domain);
    const scrolledTime = timeScale.invert(scrolledPosition);

    const shift = getShift(this.state.time, scrolledTime);

    this.setState({
      shift: this.state.isShiftBeingReset ? 0 : shift,
      isShiftBeingReset: false
    });
  }

  async getClockList() {
    const clockList = await this.fetchClockList();
    this.setState({ clockList });
  }

  async fetchClockList() {
    const data = await fetch(BACKEND_URL);
    const json = await data.json();
    return JSON.parse(json);
  }

  addClock() {
    this.setState({ addClockMode: true });
  }

  closeAddClockForm() {
    this.setState({ addClockMode: false });
  }

  async onAddClockSubmit(city, timezone) {
    const timezoneInMinutes = Number(timezone) * 60;
    await fetch(`${BACKEND_URL}?city=${city}&timezone=${timezoneInMinutes}`, {
      method: "POST"
    });

    this.getClockList();
  }

  deleteClock(id) {
    const clockList = this.state.clockList.filter(clock => clock.id !== id);
    this.setState({ clockList });

    fetch(`${BACKEND_URL}/${id}`, { method: "DELETE" });
  }
}
ClockList.propTypes = {
  editMode: PropTypes.bool.isRequired
};

function getRemoteTime(localTime, timezone) {
  const localTimezone = localTime.getTimezoneOffset();

  const remoteTimezone = -timezone;

  const timezoneDifference = localTimezone - remoteTimezone;

  return addMinutes(localTime, timezoneDifference);
}

function getShift(time, scrolledTime) {
  return scrolledTime - time;
}

const ScrollWrapper = styled.div`
  min-height: 100vh;
  overflow-x: scroll;
`;

const StyledClockList = styled.div`
  padding-top: 30px;
  padding-bottom: 50px;
  box-sizing: border-box;
  width: 300vw;
`;
