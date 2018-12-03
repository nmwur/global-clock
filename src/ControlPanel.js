import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ControlPanel = ({
  isChangeShiftDisabled,
  isResetShiftDisabled,
  editMode,
  incrementShift,
  decrementShift,
  resetShift,
  toggleEditMode,
  className
}) => (
  <div className={className}>
    <Button onClick={decrementShift} disabled={isChangeShiftDisabled}>
      <span role="img" aria-label="-">
        ➖
      </span>
    </Button>
    <Button onClick={incrementShift} disabled={isChangeShiftDisabled}>
      <span role="img" aria-label="+">
        ➕
      </span>
    </Button>
    <Button onClick={resetShift} disabled={isResetShiftDisabled}>
      reset
    </Button>
    <Button onClick={toggleEditMode} editMode={editMode}>
      <span role="img" aria-label="edit">
        ✏️
      </span>
    </Button>
  </div>
);
ControlPanel.propTypes = {
  isChangeShiftDisabled: PropTypes.bool.isRequired,
  isResetShiftDisabled: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  incrementShift: PropTypes.func.isRequired,
  decrementShift: PropTypes.func.isRequired,
  resetShift: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired
};

const StyledControlPanel = styled(ControlPanel)`
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100vw;
  display: flex;
`;

const Button = styled.button`
  flex-basis: 33%;
  border: 1px solid ${props => (props.editMode ? "#f5af5f" : "transparent")};
  border-radius: 3px;
  background: ${props => (props.editMode ? "#ffe187" : "none")};
  font-size: 20px;
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
