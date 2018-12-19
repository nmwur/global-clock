import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { addHours, addMinutes } from "date-fns";

import { Clock } from "./Clock";
import { AddClockButton } from "./AddClockButton";
import { AddClockForm } from "./AddClockForm";

const BACKEND_URL = "https://equable-stop.glitch.me/clocks";

export class ClockList extends React.Component {
  static getDerivedStateFromProps({ shift }) {
    return { localDate: getLocalDate(shift) };
  }

  state = {
    addClockMode: false,
    localDate: getLocalDate(this.props.shift),
    clockList: []
  };

  componentDidMount() {
    this.scrollToNow();
    this.updateLocalDate();
    this.updateClockList();
  }

  componentWillUnmount() {
    clearTimeout(this.updateTimeout);
  }

  render() {
    const { shift, editMode } = this.props;
    const { addClockMode, localDate, clockList } = this.state;

    return (
      <ScrollWrapper
        ref={el => (this.scrollWrapper = el)}
        onScroll={this.onScroll.bind(this)}
      >
        <StyledClockList ref={el => (this.clockList = el)}>
          <Clock city={`Local time`} date={localDate} shift={shift} />
          {clockList.map(clock => (
            <Clock
              id={clock.id}
              city={clock.city}
              date={getRemoteDate(localDate, clock.timezone)}
              timezone={clock.timezone}
              shift={shift}
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
    const { scrollWidth, clientWidth } = this.scrollWrapper;
    this.scrollWrapper.scrollBy(scrollWidth / 2 - clientWidth / 2, 0);
  }

  onScroll(event) {
    console.log(event.target.scrollLeft);
  }

  updateLocalDate() {
    this.updateTimeout = setTimeout(this.updateLocalDate.bind(this), 1000);
    const localDate = getLocalDate(this.props.shift);
    this.setState({ localDate });
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
  shift: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired
};

function getLocalDate(shift) {
  return addHours(new Date(), shift);
}

function getRemoteDate(localDate, timezone) {
  const localTimezone = localDate.getTimezoneOffset();

  const remoteTimezone = -timezone;

  const timezoneDifference = localTimezone - remoteTimezone;

  return addMinutes(localDate, timezoneDifference);
}

const ScrollWrapper = styled.div`
  min-height: 100vh;
  overflow-x: scroll;
`;

const StyledClockList = styled.div`
  padding-top: 30px;
  padding-bottom: 50px;
  box-sizing: border-box;
  width: 400vw;
`;
