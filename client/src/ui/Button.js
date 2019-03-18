import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { colors } from "ui/constants";

const Button = ({ onClick, left, children, className }) => (
  <button onClick={onClick} left={left} className={className}>
    {children}
  </button>
);
Button.propTypes = {
  onClick: PropTypes.func.isRequired
};

const StyledButton = styled(Button)`
  position: absolute;
  left: ${props => props.left}px;
  padding: 3px 6px;
  color: ${colors.text};
  font-family: monospace;
  border: 1px outset ${colors.text};
  background-color: rgba(255, 255, 255, 40%);
  outline: none;
  cursor: pointer;
  user-select: none;

  &:active {
    border-style: inset;
  }
`;

export { StyledButton as Button };
