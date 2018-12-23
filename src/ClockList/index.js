import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { addMinutes, addDays } from "date-fns";
import * as d3 from "d3";

import { Clock } from "./Clock";
import { AddClockButton } from "./AddClockButton";
import { AddClockForm } from "./AddClockForm";

const BACKEND_URL = "https://equable-stop.glitch.me/clocks";

export class ClockList extends React.Component {
  state = {
    addClockMode: false,
    localTime: getLocalTime(),
    scrolledTime: getLocalTime(), // DRY; round it if it doesn't match localTime
    clockList: []
  };

  componentDidMount() {
    this.scrollToNow();
    this.updateLocalTime();
    this.updateClockList();
  }

  componentWillUnmount() {
    clearTimeout(this.updateTimeout);
  }

  render() {
    const { editMode } = this.props;
    const { addClockMode, localTime, scrolledTime, clockList } = this.state;

    return (
      <ScrollWrapper
        ref={el => (this.scrollWrapper = el)}
        onScroll={this.onScroll.bind(this)}
      >
        <StyledClockList ref={el => (this.clockList = el)}>
          <Clock
            city={`Local time`}
            time={localTime}
            scrolledTime={scrolledTime}
          />
          {clockList.map(clock => (
            <Clock
              id={clock.id}
              city={clock.city}
              time={getRemoteTime(localTime, clock.timezone)}
              scrolledTime={getRemoteTime(scrolledTime, clock.timezone)}
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

  scrollToNow() {
    this.scrollTo();
  }

  // DRYYY
  scrollTo() {
    const { scrollWidth, clientWidth } = this.scrollWrapper;
    const defaultPosition = scrollWidth / 2 - clientWidth / 2;

    this.scrollWrapper.scrollBy(defaultPosition, 0);
  }

  onScroll() {
    const { scrollLeft, clientWidth } = this.scrollWrapper;
    const scrolledPosition = scrollLeft + clientWidth / 2;

    const timeScale = d3 // DRY
      .scaleTime()
      .domain([addDays(new Date(), -2), addDays(new Date(), 2)])
      .range([0, window.innerWidth * 3]);

    const scrolledTime = timeScale.invert(scrolledPosition);
    this.setState({ scrolledTime });
  }

  updateLocalTime() {
    this.updateTimeout = setTimeout(this.updateLocalTime.bind(this), 1000);
    const localTime = getLocalTime();
    this.setState({ localTime });
  }

  async updateClockList() {
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
    await fetch(
      `${BACKEND_URL}?city=${city}&timezone=${Number(timezone) * 60}`,
      { method: "POST" }
    );

    this.updateClockList();
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

function getLocalTime() {
  return new Date();
}

function getRemoteTime(localTime, timezone) {
  const localTimezone = localTime.getTimezoneOffset();

  const remoteTimezone = -timezone;

  const timezoneDifference = localTimezone - remoteTimezone;

  return addMinutes(localTime, timezoneDifference);
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
