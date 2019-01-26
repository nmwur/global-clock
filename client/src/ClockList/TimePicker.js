import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DateTime from "react-datetime";

import "./react-datetime.css";
import { Popup } from "ui";

export class TimePicker extends React.Component {
  state = { time: null };

  render() {
    return (
      <Popup onClose={this.props.closePopup}>
        <StyledTimePicker>
          <City>{this.props.city}</City>
          <DateTime
            value={this.state.time}
            onChange={this.handleChange.bind(this)}
            open={true}
            input={false}
          />
          <SubmitButton onClick={this.handleSubmit.bind(this)}>
            Go!
          </SubmitButton>
        </StyledTimePicker>
      </Popup>
    );
  }

  handleChange(value) {
    this.setState({ time: value.toDate() });
  }

  handleSubmit() {
    if (this.state.time) {
      this.props.onSubmit(this.state.time);
    }
    this.props.closePopup();
  }
}
TimePicker.propTypes = {
  city: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired
};

const SubmitButton = styled.button`
  min-height: 36px;
  font-family: inherit;
  color: #555;
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

const City = styled.div`
  font-size: 20px;
  position: absolute;
  transform: translateY(-100%);
  color: white;
`;

const StyledTimePicker = styled.div`
  display: flex;
  flex-direction: column;
`;
