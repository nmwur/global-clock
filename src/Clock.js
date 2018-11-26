import React from "react";
import styled from "styled-components";
import {
  format,
  isToday,
  isYesterday,
  isTomorrow,
  addHours,
  addMinutes
} from "date-fns";

const Clock = ({ city, timezone, shift, className }) => {
  const date = timezone ? getRemoteDate(timezone, shift) : getLocalDate(shift);
  const formattedDate = format(date, "hh:mm A");

  const differentDay = isToday(date)
    ? ""
    : isYesterday(date)
      ? "Yesterday"
      : isTomorrow(date)
        ? "Tomorrow"
        : format(date, "dddd");

  return (
    <div className={className}>
      <Time>
        {formattedDate}
        <DifferentDay>{differentDay}</DifferentDay>
      </Time>
      <City>{city}</City>
    </div>
  );
};

const getLocalDate = shift => addHours(new Date(), shift);

const getRemoteDate = (timezone, shift) => {
  const localDate = getLocalDate(shift);
  const localTimezone = localDate.getTimezoneOffset();

  const remoteTimezone = -timezone;

  const timezoneDifference = localTimezone - remoteTimezone;

  return addMinutes(localDate, timezoneDifference);
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
`;

const City = styled.div`
  font-size: 20px;
  color: #737dc3;
`;

const StyledClock = styled(Clock)`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin: 5px;
  border: 1px solid #b4c8d7;
  border-radius: 3px;
`;

export { StyledClock as Clock };
