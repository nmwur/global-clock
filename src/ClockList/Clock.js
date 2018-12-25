import React from "react";
import styled from "styled-components";
import {
  format,
  addDays,
  getMinutes,
  setMinutes,
  startOfMinute
} from "date-fns";
import PropTypes from "prop-types";
import * as d3 from "d3";

import { DeleteClockButton } from "./DeleteClockButton";

export class Clock extends React.Component {
  componentDidMount() {
    const domain = [addDays(this.props.time, -2), addDays(this.props.time, 2)];
    const timeScale = getTimeScale(domain);

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
    const scrolledTime = getScrolledTime(this.props.time, this.props.shift);

    let roundedTime =
      this.props.shift === 0
        ? scrolledTime
        : roundToNearestMinutes(scrolledTime, 15);

    const formattedTime = format(roundedTime, "hh:mm A");

    return (
      <StyledClock ref={el => (this.clockRef = el)}>
        <City>{this.props.city}</City>
        <Time>{formattedTime}</Time>
        {this.props.editMode && (
          <DeleteClockButton onClick={this.deleteClockHandler.bind(this)} />
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
  shift: PropTypes.number.isRequired,
  timezone: PropTypes.number,
  editMode: PropTypes.bool,
  deleteClock: PropTypes.func
};

function roundToNearestMinutes(date, interval) {
  var roundedMinutes = Math.floor(getMinutes(date) / interval) * interval;
  return setMinutes(startOfMinute(date), roundedMinutes);
}

function getScrolledTime(time, shift) {
  return new Date(Number(time) + shift);
}

export function getTimeScale(domain) {
  return d3
    .scaleTime()
    .domain(domain)
    .range([0, window.innerWidth * 3]);
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
