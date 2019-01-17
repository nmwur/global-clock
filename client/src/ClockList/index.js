import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { addMinutes } from "date-fns";

import getTimeScale from "./getTimeScale";
import { timeline } from "ui/constants";

import { Clock } from "./Clock";
import { AddClockButton } from "./AddClockButton";
import { AddClockForm } from "./AddClockForm";

export class ClockList extends React.Component {
  state = {
    time: new Date(),
    shift: 0,
    isShiftBeingReset: false,
    addClockMode: false,
    timeScale: null
  };

  componentDidMount() {
    this.props.onRef(this);
    this.scrollToNow();
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    return (
      <ScrollWrapper
        ref={el => (this.scrollWrapper = el)}
        onScroll={this.onScroll.bind(this)}
      >
        <StyledClockList ref={el => (this.clockList = el)}>
          <Clock
            city={`Local time`}
            time={this.state.time}
            shift={this.state.shift}
            timezone={getTimezone(this.state.time)}
            isEditMode={this.props.isEditMode}
            pickTime={this.pickTime.bind(this)}
          />
          {this.props.clockList.map(clock => (
            <Clock
              id={clock.id}
              city={clock.city}
              time={getRemoteTime(this.state.time, clock.timezone)}
              shift={this.state.shift}
              timezone={clock.timezone}
              isEditMode={this.props.isEditMode}
              deleteClock={this.props.deleteClock.bind(this)}
              pickTime={this.pickTime.bind(this)}
              key={clock.id}
            />
          ))}
          {this.props.isEditMode && (
            <AddClockButton onClick={this.openAddClockForm.bind(this)} />
          )}
          {this.state.addClockMode && (
            <AddClockForm
              onSubmit={this.props.addClock.bind(this)}
              closeForm={this.closeAddClockForm.bind(this)}
            />
          )}
        </StyledClockList>
        {!this.props.isEditMode && <Scrubber />}
      </ScrollWrapper>
    );
  }

  pickTime(remoteTime, timezone) {
    const localTime = getLocalTime(remoteTime, timezone);
    this.scrollTo(localTime);
  }

  async scrollTo(time) {
    await this.setState({ time, timeScale: getTimeScale(time) });
    const scaledTime = this.state.timeScale(time);
    const halfScreenOffset = this.scrollWrapper.clientWidth / 2;
    this.scrollWrapper.scrollLeft = scaledTime - halfScreenOffset;
  }

  async scrollToNow() {
    await this.setState({ isShiftBeingReset: true });
    this.scrollTo(new Date());
  }

  onScroll() {
    const { scrollLeft, clientWidth, scrollWidth } = this.scrollWrapper;
    const scrolledPosition = scrollLeft + clientWidth / 2;

    const scrolledTime = this.state.timeScale.invert(scrolledPosition);

    const shift = getShift(this.state.time, scrolledTime);

    this.setState({
      shift: this.state.isShiftBeingReset ? 0 : shift,
      isShiftBeingReset: false
    });

    const isScrolledToEarliest = scrollLeft === 0;
    const isScrolledToLatest = scrollLeft + clientWidth === scrollWidth;
    if (isScrolledToEarliest || isScrolledToLatest) {
      this.scrollTo(scrolledTime);
    }
  }

  openAddClockForm() {
    this.setState({ addClockMode: true });
  }

  closeAddClockForm() {
    this.setState({ addClockMode: false });
  }
}
ClockList.propTypes = {
  clockList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      timezone: PropTypes.number.isRequired
    })
  ).isRequired,
  deleteClock: PropTypes.func,
  isEditMode: PropTypes.bool.isRequired
};

function getTimezone(time) {
  return -time.getTimezoneOffset();
}

function getRemoteTime(localTime, timezone) {
  const localTimezone = getTimezone(localTime);
  const remoteTimezone = timezone;
  const timezoneDifference = remoteTimezone - localTimezone;
  return addMinutes(localTime, timezoneDifference);
}

function getLocalTime(remoteTime, timezone) {
  const localTimezone = getTimezone(new Date());
  const remoteTimezone = timezone;
  const timezoneDifference = remoteTimezone - localTimezone;
  return addMinutes(remoteTime, -timezoneDifference);
}

function getShift(time, scrolledTime) {
  return scrolledTime - time;
}

const ScrollWrapper = styled.div`
  min-height: 100vh;
  overflow-x: scroll;
`;

const Scrubber = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 1;
  width: 1px;
  height: 100%;
  border-left: 2px dashed #ed957b;
`;

const StyledClockList = styled.div`
  padding-top: 30px;
  padding-bottom: 50px;
  box-sizing: border-box;
  width: calc(100vw * ${timeline.width});
`;
