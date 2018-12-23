import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ControlPanel = ({ editMode, toggleEditMode, resetShift, className }) => (
  <div className={className}>
    <Button onClick={resetShift}>reset</Button>
    <Button onClick={toggleEditMode} editMode={editMode}>
      <span role="img" aria-label="edit">
        ✏️
      </span>
    </Button>
    {/* sign in or out */}
  </div>
);
ControlPanel.propTypes = {
  editMode: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  resetShift: PropTypes.func.isRequired
};

const StyledControlPanel = styled(ControlPanel)`
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
`;

const Button = styled.button`
  flex-basis: 50%;
  border: 1px solid ${props => (props.editMode ? "#f5af5f" : "transparent")};
  background: ${props => (props.editMode ? "#ffe187" : "none")};
  font-size: 20px;
  font-family: monospace;
  margin: 2px;
  outline: none;

  &:active {
    border-color: #f5af5f;
    background-color: #ffe187;
  }

  &:disabled {
    opacity: 0.4;
  }
`;

export { StyledControlPanel as ControlPanel };
