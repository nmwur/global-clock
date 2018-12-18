import React from "react";
import styled from "styled-components";

const AddClockButton = ({ addClock, className }) => (
  <button onClick={addClock} className={className}>
    add clock
  </button>
);

const StyledAddClockButton = styled(AddClockButton)`
  display: inline-block;
  padding: 2px 4px;
  color: #737dc3;
  border: 1px solid transparent;
  background: none;
  outline: none;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #ffe187;
  }
  &:active {
    background-color: #ffe187;
    border-color: #f5af5f;
  }
`;

export { StyledAddClockButton as AddClockButton };
