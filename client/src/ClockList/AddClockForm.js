import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { Popup } from "ui";

export class AddClockForm extends React.Component {
  state = {
    city: ""
  };

  componentDidMount() {
    this.city.focus();
    this.updateSessionToken();
  }

  render() {
    return (
      <Popup onClose={this.props.closeForm}>
        <StyledAddClockForm>
          <PlacesAutocomplete
            value={this.state.city}
            onChange={this.handleChange.bind(this)}
            onSelect={this.handleSelect.bind(this)}
            searchOptions={{ types: ["(cities)"] }}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <TextInput
                  ref={el => (this.city = el)}
                  {...getInputProps({
                    placeholder: "Search cities ..."
                  })}
                />
                <div>
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <Suggestion
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        <span>{suggestion.description}</span>
                      </Suggestion>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </StyledAddClockForm>
      </Popup>
    );
  }

  handleChange(city) {
    this.setState({ city });
  }

  async handleSelect(address) {
    this.updateSessionToken();
    let city, timezone;

    geocodeByAddress(address)
      .then(results => {
        city = results[0].address_components[0].long_name;

        return getLatLng(results[0]);
      })
      .then(latLng => {
        const latitude = latLng.lat.toFixed(7);
        const longitude = latLng.lng.toFixed(7);
        const timestamp = new Date().getTime() / 1000;

        return fetch(
          `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=AIzaSyCA7uNAf8XkIBe7FtuJvnAfaGJmNBGhRxE`
        );
      })
      .then(response => response.json())
      .then(timezoneObj => {
        timezone = timezoneObj.timeZoneId;

        this.props.onSubmit(city, timezone);
        this.props.closeForm();
      })
      .catch(error => console.error("Error", error));
  }

  updateSessionToken() {
    const sessionToken = new window.google.maps.places.AutocompleteSessionToken();
    this.setState({ sessionToken: sessionToken });
  }
}
AddClockForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired
};

const TextInput = styled.input`
  display: block;
  font-size: 20px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const Suggestion = styled.div`
  padding: 5px;
`;

const StyledAddClockForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-width: 240px;

  .search-input {
    width: 100%;
    height: 30px;
  }

  .search-autocomplete-container {
    border-bottom: honeydew;
    border-left: honeydew;
    border-right: honeydew;
    border-top: 1px solid #e6e6e6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 2px 2px;
  }
`;
