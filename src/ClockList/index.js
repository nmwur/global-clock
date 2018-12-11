import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import uniqid from "uniqid";

import { Clock } from "./Clock";
import { AddClockButton } from "./AddClockButton";
import { AddClockForm } from "./AddClockForm";

export class ClockList extends React.Component {
  state = {
    addClockMode: false,
    clockList: [
      {
        id: uniqid(),
        city: "Honolulu",
        timezone: -600
      },
      {
        id: uniqid(),
        city: "Moscow",
        timezone: 180
      }
    ]
  };

  render() {
    const { shift, editMode } = this.props;

    return (
      <StyledClockList>
        <Clock city={`Local time`} shift={shift} />
        {this.state.clockList.map(clock => (
          <Clock
            id={clock.id}
            city={clock.city}
            timezone={clock.timezone}
            shift={shift}
            editMode={editMode}
            deleteClock={this.deleteClock.bind(this)}
            key={clock.id}
          />
        ))}
        {editMode && <AddClockButton addClock={this.addClock.bind(this)} />}
        {this.state.addClockMode && (
          <AddClockForm
            onSubmit={this.onAddClockSubmit.bind(this)}
            closeForm={this.closeAddClockForm.bind(this)}
          />
        )}
      </StyledClockList>
    );
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

const StyledClockList = styled.div`
  padding: 5px;
  padding-bottom: 50px;
  box-sizing: border-box;
  overflow-y: scroll;
`;
