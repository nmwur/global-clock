import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const DeleteClockButton = ({ onClick, className }) => (
  <button onClick={onClick} className={className}>
    [delete]
  </button>
);
DeleteClockButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

const StyledDeleteClockButton = styled(DeleteClockButton)`
  position: absolute;
  left: 240px;
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

export { StyledDeleteClockButton as DeleteClockButton };
