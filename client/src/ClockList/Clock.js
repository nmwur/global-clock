import React from "react";
import styled from "styled-components";
import { format, getMinutes, setMinutes, startOfMinute } from "date-fns";
import PropTypes from "prop-types";
import * as d3 from "d3";

import getTimeScale from "./getTimeScale";
import { timeline } from "ui/constants";

import { DeleteClockButton } from "./DeleteClockButton";
import { TimePicker } from "./TimePicker";

export class Clock extends React.Component {
  state = {
    isPickDateMode: false
  };

  componentDidMount() {
    this.drawTimeChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.time.getTime() !== this.props.time.getTime()) {
      this.drawTimeChart();
    }
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

        <div onClick={this.togglePickDateMode.bind(this)}>pick date</div>

        {this.props.isEditMode && (
          <DeleteClockButton onClick={this.deleteClockHandler.bind(this)} />
        )}

        {this.state.isPickDateMode && (
          <TimePicker
            onSubmit={this.pickTime.bind(this)}
            closePopup={this.togglePickDateMode.bind(this)}
          />
        )}
      </StyledClock>
    );
  }

  drawTimeChart() {
    const timeScale = getTimeScale(this.props.time);

    const xAxis = d3
      .axisBottom(timeScale)
      .ticks(d3.timeDay.every(1))
      .tickSizeOuter(0);

    d3.select(this.clockRef)
      .selectAll("svg")
      .remove();

    const svg = d3
      .select(this.clockRef)
      .append("svg")
      .attr("width", window.innerWidth * timeline.width)
      .attr("height", 50);

    svg
      .append("g")
      .call(xAxis)
      .style("transform", "translateY(25px)")
      .style("color", "#737dc3");
  }

  deleteClockHandler() {
    this.props.deleteClock(this.props.id);
  }

  togglePickDateMode() {
    this.setState({ isPickDateMode: !this.state.isPickDateMode });
  }

  pickTime(time) {
    this.props.pickTime(time, this.props.timezone);
  }
}
Clock.propTypes = {
  city: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
  shift: PropTypes.number.isRequired,
  timezone: PropTypes.number,
  isisEditMode: PropTypes.bool,
  deleteClock: PropTypes.func
};

function roundToNearestMinutes(date, interval) {
  var roundedMinutes = Math.floor(getMinutes(date) / interval) * interval;
  return setMinutes(startOfMinute(date), roundedMinutes);
}

function getScrolledTime(time, shift) {
  return new Date(Number(time) + shift);
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
