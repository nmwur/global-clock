import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const AddClockButton = ({ onClick, className }) => (
  <Wrapper>
    <button onClick={onClick} className={className}>
      [add clock]
    </button>
  </Wrapper>
);
AddClockButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

const Wrapper = styled.div`
  padding-bottom: 40px;
`;

const StyledAddClockButton = styled(AddClockButton)`
  position: absolute;
  display: inline-block;
  left: 4px;
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
