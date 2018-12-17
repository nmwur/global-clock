import React from "react";
import styled from "styled-components";
import { format, isToday, isYesterday, isTomorrow } from "date-fns";
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

  const differentDay = isToday(date)
    ? ""
    : isYesterday(date)
      ? "Yesterday"
      : isTomorrow(date)
        ? "Tomorrow"
        : format(date, "dddd");

  const deleteClockHandler = () => deleteClock(id);

  return (
    <div className={className}>
      <Time>
        {formattedDate}
        <DifferentDay>{differentDay}</DifferentDay>
      </Time>
      <City>{city}</City>
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
  font-size: 30px;
  font-weight: 600;
  color: #ffb432;
  font-family: monospace;
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
`;

const DifferentDay = styled.span`
  font-size: 22px;
  font-weight: 400;
  font-family: auto;
`;

const City = styled.div`
  font-size: 20px;
  color: #737dc3;
`;

const StyledClock = styled(Clock)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin-bottom: 5px;
  border: 1px solid #b4c8d7;
`;

export { StyledClock as Clock };
