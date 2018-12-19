import React from "react";
import styled from "styled-components";

const AddClockButton = ({ addClock, className }) => (
  <button onClick={addClock} className={className}>
    add clock
  </button>
);

const StyledAddClockButton = styled(AddClockButton)`
  position: absolute;
  display: inline-block;
  padding: 2px 4px;
  color: #555;
  font-family: monospace;
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
