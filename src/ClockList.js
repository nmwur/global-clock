import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Clock } from "./Clock";

const ClockList = ({ shift, clockList, className }) => (
  <div className={className}>
    <Clock city={`Local time`} shift={shift} />
    {clockList.map(clock => (
      <Clock
        city={clock.city}
        timezone={clock.timezone}
        shift={shift}
        key={clock.city}
      />
    ))}
  </div>
);
ClockList.propTypes = {
  shift: PropTypes.number.isRequired,
  clockList: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      timezone: PropTypes.number
    })
  ).isRequired
};

const StyledClockList = styled(ClockList)`
  position: fixed;
  height: calc(100vh - 50px);
  width: 100vw;
  background-color: #cddcf0;
  box-sizing: border-box;
`;

export { StyledClockList as ClockList };
