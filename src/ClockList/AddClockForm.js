import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Popup } from "ui";

const AddClockForm = ({ onSubmit, closeForm, className }) => {
  let city = null;
  let timezone = null;

  const handleSubmit = event => {
    onSubmit(city.value, timezone.value);
    closeForm();
    event.preventDefault();
  };

  return (
    <Popup closePopup={closeForm}>
      <div className={className}>
        <form onSubmit={handleSubmit}>
          <Label>
            City:
            <TextInput ref={el => (city = el)} type="text" name="city" />
          </Label>
          <Label>
            Timezone:
            <TextInput ref={el => (timezone = el)} type="text" name="city" />
          </Label>
          <SubmitButton type="submit" value="Save" />
        </form>
      </div>
    </Popup>
  );
};
AddClockForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired
};

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const TextInput = styled.input`
  display: block;
  font-size: 25px;
  width: 100%;
`;

const SubmitButton = styled.input``;

const StyledAddClockForm = styled(AddClockForm)`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin-bottom: 5px;
`;

export { StyledAddClockForm as AddClockForm };
