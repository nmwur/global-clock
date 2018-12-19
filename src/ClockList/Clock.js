import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import PropTypes from "prop-types";

import { DeleteClockButton } from "./DeleteClockButton";

const Clock = ({
  id,
  city,
  date,
  timezone,
  editMode,
  deleteClock,
  className
}) => {
  const formattedDate = format(date, "hh:mm A");

  const deleteClockHandler = () => deleteClock(id);

  return (
    <div className={className}>
      <City>{city}</City>
      <Time>{formattedDate}</Time>
      {editMode && <DeleteClockButton deleteClock={deleteClockHandler} />}
    </div>
  );
};
Clock.propTypes = {
  city: PropTypes.string.isRequired,
  timezone: PropTypes.number,
  shift: PropTypes.number.isRequired,
  editMode: PropTypes.bool,
  deleteClock: PropTypes.func
};

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

const StyledClock = styled(Clock)`
  min-height: 25px;
  margin-bottom: 50px;
  width: 100%;
  border-bottom: 1px dashed #b4c8d7;
`;

export { StyledClock as Clock };
