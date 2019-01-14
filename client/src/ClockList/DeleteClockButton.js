import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const DeleteClockButton = ({ onClick, className }) => (
  <div onClick={onClick} className={className}>
    [delete]
  </div>
);
DeleteClockButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

const StyledDeleteClockButton = styled(DeleteClockButton)`
  position: absolute;
  right: 0;
  padding: 2px 4px;
  background: none;
  border: 1px solid transparent;
  color: #555;
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
