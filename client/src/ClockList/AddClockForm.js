import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Popup } from "ui";

export class AddClockForm extends React.Component {
  componentDidMount() {
    this.city.focus();
  }

  render() {
    return (
      <Popup onClose={this.props.closeForm}>
        <StyledAddClockForm onSubmit={this.handleSubmit.bind(this)}>
          <Label>
            City:
            <TextInput ref={el => (this.city = el)} type="text" name="city" />
          </Label>
          <Label>
            Timezone:
            <TextInput
              ref={el => (this.timezone = el)}
              type="text"
              name="city"
            />
          </Label>
          <SubmitButton type="submit" value="Save" />
        </StyledAddClockForm>
      </Popup>
    );
  }

  handleSubmit(event) {
    const timezoneInMinutes = Number(this.timezone.value) * 60;
    this.props.onSubmit(this.city.value, timezoneInMinutes);
    this.props.closeForm();
    event.preventDefault();
  }
}
AddClockForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired
};

const Label = styled.label`
  display: block;
  color: #555;
  margin: 0 20px 20px 10px;
`;

const TextInput = styled.input`
  display: block;
  font-size: 25px;
  width: 100%;
  box-sizing: border-box;
`;

const SubmitButton = styled.input`
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

const StyledAddClockForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px 0 0 0;
`;
