import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { addMinutes, addDays } from "date-fns";

import { Clock, getTimeScale } from "./Clock";
import { AddClockButton } from "./AddClockButton";
import { AddClockForm } from "./AddClockForm";

export class ClockList extends React.Component {
  state = {
    time: new Date(),
    shift: 0,
    isShiftBeingReset: false,
    addClockMode: false
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
          />
          {this.props.clockList.map(clock => (
            <Clock
              id={clock.id}
              city={clock.city}
              time={getRemoteTime(this.state.time, clock.timezone)}
              shift={this.state.shift}
              timezone={clock.timezone}
              editMode={this.props.editMode}
              deleteClock={this.props.deleteClock.bind(this)}
              key={clock.id}
            />
          ))}
          {this.props.editMode && (
            <AddClockButton onClick={this.openAddClockForm.bind(this)} />
          )}
          {this.state.addClockMode && (
            <AddClockForm
              onSubmit={this.props.addClock.bind(this)}
              closeForm={this.closeAddClockForm.bind(this)}
            />
          )}
        </StyledClockList>
        <Scrubber />
      </ScrollWrapper>
    );
  }

  async scrollToNow() {
    await this.setState({
      time: new Date(),
      isShiftBeingReset: true
    });

    const { scrollWidth, clientWidth } = this.scrollWrapper;
    const defaultPosition = scrollWidth / 2 - clientWidth / 2;
    this.scrollWrapper.scrollLeft = defaultPosition;
  }

  onScroll() {
    const { scrollLeft, clientWidth } = this.scrollWrapper;
    const scrolledPosition = scrollLeft + clientWidth / 2;

    const domain = [addDays(new Date(), -2), addDays(new Date(), 2)];
    const timeScale = getTimeScale(domain);
    const scrolledTime = timeScale.invert(scrolledPosition);

    const shift = getShift(this.state.time, scrolledTime);

    this.setState({
      shift: this.state.isShiftBeingReset ? 0 : shift,
      isShiftBeingReset: false
    });
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
  editMode: PropTypes.bool.isRequired
};

function getRemoteTime(localTime, timezone) {
  const localTimezone = localTime.getTimezoneOffset();

  const remoteTimezone = -timezone;

  const timezoneDifference = localTimezone - remoteTimezone;

  return addMinutes(localTime, timezoneDifference);
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
  border-left: 2px dashed #ffb432;
`;

const StyledClockList = styled.div`
  padding-top: 30px;
  padding-bottom: 50px;
  box-sizing: border-box;
  width: 300vw;
`;
