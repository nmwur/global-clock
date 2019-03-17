import React from "react";
import styled from "styled-components";
import { format, getMinutes, setMinutes, startOfMinute } from "date-fns";
import PropTypes from "prop-types";
import * as d3 from "d3";

import getTimeScale from "./getTimeScale";
import { timeline, colors } from "ui/constants";

import { DeleteClockButton } from "./DeleteClockButton";
import { TimePicker } from "./TimePicker";

export class Clock extends React.Component {
  state = {
    isPickDateMode: false
  };

  componentDidMount() {
    if (!this.props.isEditMode) {
      this.drawTimeChart();
    }
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.time.getTime() !== this.props.time.getTime() &&
      !this.props.isEditMode
    ) {
      this.clearTimeChart();
      this.drawTimeChart();
    } else if (!prevProps.isEditMode && this.props.isEditMode) {
      this.clearTimeChart();
    } else if (prevProps.isEditMode && !this.props.isEditMode) {
      this.drawTimeChart();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize.bind(this));
  }

  render() {
    const scrolledTime = getScrolledTime(this.props.time, this.props.shift);

    let roundedTime =
      this.props.shift === 0
        ? scrolledTime
        : roundToNearestMinutes(scrolledTime, 15);

    const formattedTime = format(roundedTime, "hh:mm A");

    const timezoneInHours = `${this.props.timezoneOffset > 0 ? "+" : ""}${this
      .props.timezoneOffset / 60}`;

    return (
      <StyledClock ref={el => (this.clockRef = el)}>
        <City>
          {this.props.city}
          {this.props.isEditMode && ` (${timezoneInHours})`}
        </City>
        {!this.props.isEditMode && <Time>{formattedTime}</Time>}

        {!this.props.isEditMode && (
          <PickDateButton onClick={this.togglePickDateMode.bind(this)}>
            <span role="img" aria-label="pick date">
              📅
            </span>
          </PickDateButton>
        )}

        {this.props.isEditMode && (
          <DeleteClockButton onClick={this.deleteClockHandler.bind(this)} />
        )}

        {this.state.isPickDateMode && (
          <TimePicker
            city={this.props.city}
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

    const svg = d3
      .select(this.clockRef)
      .append("svg")
      .attr("width", window.innerWidth * timeline.width)
      .attr("height", 50);

    svg
      .append("g")
      .call(xAxis)
      .style("transform", "translateY(25px)")
      .style("color", colors.text)
      .style("font-size", "12px")
      .style("font-family", "monospace")
      .style("user-select", "none");
  }

  clearTimeChart() {
    d3.select(this.clockRef)
      .selectAll("svg")
      .remove();
  }

  deleteClockHandler() {
    this.props.deleteClock(this.props.id);
  }

  togglePickDateMode() {
    this.setState({ isPickDateMode: !this.state.isPickDateMode });
  }

  pickTime(time) {
    this.props.pickTime(time, this.props.timezoneOffset);
  }

  onWindowResize() {
    this.clearTimeChart();
    if (!this.props.isEditMode) {
      this.drawTimeChart();
    }
  }
}
Clock.propTypes = {
  city: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
  shift: PropTypes.number.isRequired,
  timezoneOffset: PropTypes.number.isRequired,
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

const Time = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: rgba(255, 255, 255, 80%);
  font-family: monospace;
  display: inline-flex;
  justify-content: space-between;
  position: absolute;
  left: calc(60% + 5px);
  transform: translateY(-2px);
  pointer-events: none;
`;

const City = styled.div`
  position: absolute;
  left: 5px;
  font-family: monospace;
  font-size: 18px;
  color: ${colors.text};
  pointer-events: none;
`;

const PickDateButton = styled.div`
  opacity: 0;
  position: absolute;
  right: 5px;
  cursor: pointer;
  pointer-events: none;
  transition: opacity 0.2s;
`;

const StyledClock = styled.div`
  height: 50px;
  margin-bottom: 25px;
  width: 100%;

  &:hover ${PickDateButton} {
    opacity: 1;
    pointer-events: auto;
  }
`;
