import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import uniqid from "uniqid";
import { addHours, addMinutes } from "date-fns";

import { Clock } from "./Clock";
import { AddClockButton } from "./AddClockButton";
import { AddClockForm } from "./AddClockForm";

export class ClockList extends React.Component {
  state = {
    addClockMode: false,
    localDate: getLocalDate(this.props.shift),
    clockList: []
  };

  async componentDidMount() {
    this.updateLocalDate();

    const clockList = await this.fetchClockList();
    this.setState({ clockList });
  }

  componentWillUnmount() {
    clearTimeout(this.updateTimeout);
  }

  render() {
    const { shift, editMode } = this.props;
    const { addClockMode, localDate, clockList } = this.state;

    return (
      <StyledClockList>
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
    );
  }

  updateLocalDate() {
    this.updateTimeout = setTimeout(this.updateLocalDate.bind(this), 1000);
    const localDate = getLocalDate(this.props.shift);
    this.setState({ localDate });
  }

  async fetchClockList() {
    const data = await fetch("https://equable-stop.glitch.me/");
    const json = await data.json();
    return JSON.parse(json).clockList;
  }

  addClock() {
    this.setState({ addClockMode: true });
  }

  closeAddClockForm() {
    this.setState({ addClockMode: false });
  }

  onAddClockSubmit(city, timezone) {
    const newClock = {
      id: uniqid(),
      city,
      timezone: Number(timezone) * 60
    };

    this.setState({ clockList: [...this.state.clockList, newClock] });
  }

  deleteClock(id) {
    const clockList = this.state.clockList.filter(clock => clock.id !== id);
    this.setState({ clockList });
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

const StyledClockList = styled.div`
  padding: 5px;
  padding-bottom: 50px;
  box-sizing: border-box;
`;
