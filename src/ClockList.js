import React from "react";
import styled from "styled-components";

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

const StyledClockList = styled(ClockList)`
  position: fixed;
  height: calc(100vh - 50px);
  width: 100vw;
  background-color: #cddcf0;
  box-sizing: border-box;
`;

export { StyledClockList as ClockList };
