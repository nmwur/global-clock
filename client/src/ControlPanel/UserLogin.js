import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import load from "load-script";

import { Popup } from "ui/Popup";

export class UserLogin extends React.Component {
  state = {
    isGapiLoaded: !!window.gapi
  };

  componentDidMount() {
    if (this.setState.isGapiLoaded) {
      this.renderLoginButton();
    } else {
      this.loadGapi(this.renderLoginButton);
    }
  }

  render() {
    return (
      <Popup onClose={this.props.closeUserPopup.bind(this)}>
        <div id="login-button" />
      </Popup>
    );
  }

  loadGapi(callback) {
    load("https://apis.google.com/js/platform.js", (err, script) => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2.init();
        callback.call(this);
      });
    });
  }

  renderLoginButton() {
    window.gapi.signin2.render("login-button", {
      scope: "openid",
      width: 200,
      height: 50,
      onsuccess: this.onSuccess.bind(this),
      onfailure: this.onFailure.bind(this)
    });
  }

  onSuccess(googleUser) {
    this.props.closeUserPopup();

    const idToken = googleUser.getAuthResponse().id_token;
    this.createSession(idToken);

    const userPicUrl = googleUser.w3.Paa;
    this.props.updateUserPicUrl(userPicUrl);
  }

  onFailure(response) {
    console.error(response);
  }

  async createSession(idToken) {
    const response = await fetch("/tokensignin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken })
    });
    if (response.ok) {
      this.props.updateClockList();
    }
  }
}
