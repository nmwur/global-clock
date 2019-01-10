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
        <button
          disabled={!this.state.isGapiLoaded}
          onClick={this.logout.bind(this)}
        >
          Logout
        </button>
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
    fetch("/tokensignout").then(response => {
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
