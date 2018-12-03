import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Clock } from "./Clock";
import { AddClock } from "./AddClock";

export class ClockList extends React.Component {
  state = {
    clockList: [
      {
        city: "Honolulu",
        timezone: -600
      },
      {
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
            city={clock.city}
            timezone={clock.timezone}
            shift={shift}
            editMode={editMode}
            deleteClock={this.deleteClock.bind(this)}
            key={clock.city}
          />
        ))}
        {editMode && <AddClock />}
      </StyledClockList>
    );
  }

  deleteClock(city) {
    const clockList = this.state.clockList.filter(clock => clock.city !== city);
    this.setState({ clockList });
  }
}
ClockList.propTypes = {
  shift: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired
};

const StyledClockList = styled.div`
  position: fixed;
  height: calc(100vh - 50px);
  width: 100vw;
  padding: 5px;
  background-color: #cddcf0;
  box-sizing: border-box;
  overflow-y: scroll;
`;
