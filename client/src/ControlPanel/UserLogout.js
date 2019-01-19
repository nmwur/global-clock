import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import load from "load-script";

import { Popup } from "ui/Popup";

export class UserLogout extends React.Component {
  state = {
    isGapiLoaded: !!window.gapi
  };

  componentDidMount() {
    if (!this.state.isGapiLoaded) {
      this.loadGapi();
    }
  }

  render() {
    return (
      <Popup onClose={this.props.closeUserPopup.bind(this)}>
        <StyledUserLogout>
          <Appeal>Log out of your Google account:</Appeal>
          <Button
            disabled={!this.state.isGapiLoaded}
            onClick={this.logout.bind(this)}
          >
            Logout
          </Button>
        </StyledUserLogout>
      </Popup>
    );
  }

  loadGapi() {
    load("https://apis.google.com/js/platform.js", (err, script) => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2.init();
        this.setState({ isGapiLoaded: true });
      });
    });
  }

  logout() {
    document.cookie =
      "MyGoogleID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2
      .signOut()
      .then(this.onSuccess.bind(this))
      .catch(this.onFailure.bind(this));
  }

  async onSuccess(googleUser) {
    this.props.closeUserPopup();
    fetch("/auth/tokensignout").then(response => {
      if (response.ok) {
        this.props.updateClockList();
      }
    });
    localStorage.userName = undefined;
  }

  onFailure(response) {
    console.error(response);
  }
}
UserLogout.propTypes = {
  updateClockList: PropTypes.func.isRequired,
  closeUserPopup: PropTypes.func.isRequired
};

const Button = styled.button`
  width: 120px;
  height: 50px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  color: #757575;
  border-radius: 1px;
  border: 1px solid white;
  font-family: arial;
  font-size: 16px;
  background-color: #fff;
  cursor: pointer;
`;

const Appeal = styled.div`
  color: #343434;
  font-size: 16px;
  margin-bottom: 10px;
`;

const StyledUserLogout = styled.div`
  padding: 10px;
`;
