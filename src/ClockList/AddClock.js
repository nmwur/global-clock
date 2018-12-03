import React from "react";
import styled from "styled-components";

const AddClock = ({ className }) => <div className={className}>add clock</div>;

const StyledAddClock = styled(AddClock)`
  display: inline-block;
  padding: 2px 4px;
  color: #737dc3;
  border: 1px solid transparent;
  background: none;
  outline: none;

  &:active {
    border-color: #f5af5f;
    background-color: #ffe187;
  }
`;

export { StyledAddClock as AddClock };
