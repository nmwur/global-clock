import React from "react";
import styled from "styled-components";
import {
  format,
  addDays,
  getMinutes,
  setMinutes,
  startOfMinute,
  isEqual
} from "date-fns";
import PropTypes from "prop-types";
import * as d3 from "d3";

import { DeleteClockButton } from "./DeleteClockButton";

export class Clock extends React.Component {
  componentDidMount() {
    const { time } = this.props;

    const timeScale = d3
      .scaleTime()
      .domain([addDays(time, -2), addDays(time, 2)])
      .range([0, window.innerWidth * 3]);
    timeScale.ticks(d3.timeHour.every(6)); // d3.timeHour.every(5) doesn't work
    const xAxis = d3.axisBottom(timeScale).tickSizeOuter(0);
    const svg = d3
      .select(this.clockRef)
      .append("svg")
      .attr("width", window.innerWidth * 3)
      .attr("height", 50);
    svg
      .append("g")
      .call(xAxis)
      .style("transform", "translateY(25px)")
      .style("color", "#737dc3");
  }

  render() {
    const { city, time, scrolledTime, editMode } = this.props;

    // the compared items will be just scrolledTime and time
    // refactor will be possible after state.scrolledTime in ClockList gets DRY
    let roundedTime = isEqual(
      roundToNearestMinutes(scrolledTime, 1),
      roundToNearestMinutes(time, 1)
    )
      ? scrolledTime
      : roundToNearestMinutes(scrolledTime, 15);

    const formattedTime = format(roundedTime, "hh:mm A");

    return (
      <StyledClock ref={el => (this.clockRef = el)}>
        <City>{city}</City>
        <Time>{formattedTime}</Time>
        {editMode && (
          <DeleteClockButton deleteClock={this.deleteClockHandler.bind(this)} />
        )}
      </StyledClock>
    );
  }

  deleteClockHandler() {
    this.props.deleteClock(this.props.id);
  }
}
Clock.propTypes = {
  city: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
  timezone: PropTypes.number,
  editMode: PropTypes.bool,
  deleteClock: PropTypes.func
};

function roundToNearestMinutes(date, interval) {
  var roundedMinutes = Math.floor(getMinutes(date) / interval) * interval;
  return setMinutes(startOfMinute(date), roundedMinutes);
}

// choose more contrast color
const Time = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #ffb432;
  font-family: monospace;
  display: inline-flex;
  justify-content: space-between;
  position: absolute;
  left: calc(50% + 5px);
  pointer-events: none;
`;

const City = styled.div`
  position: absolute;
  left: 5px;
  font-family: monospace;
  font-size: 18px;
  color: #737dc3;
  pointer-events: none;
`;

// show borders and timezone on edit; hide timeline on edit
const StyledClock = styled.div`
  min-height: 25px;
  margin-bottom: 50px;
  width: 100%;
`;
