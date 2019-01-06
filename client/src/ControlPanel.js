import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import { Popup } from "ui/Popup";

export class ControlPanel extends React.Component {
  state = {
    isLoginMode: false,
    isLoggedIn: false
  };

  componentDidMount() {}

  render() {
    return (
      <StyledControlPanel>
        <Button onClick={this.props.resetShift}>
          <span role="img" aria-label="reset">
            🔃
          </span>
        </Button>
        <Button
          onClick={this.props.toggleEditMode}
          isEditMode={this.props.isEditMode}
        >
          <span role="img" aria-label="edit">
            ✏️
          </span>
        </Button>
        <Button onClick={this.openLoginConfirmation.bind(this)}>
          {this.state.isLoggedIn ? "logout" : "login"}
        </Button>
        {this.state.isLoginMode &&
          (this.state.isLoggedIn ? (
            <Popup onClose={this.closeLoginConfirmation.bind(this)}>
              <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={this.onLogoutSuccess.bind(this)}
              />
            </Popup>
          ) : (
            <Popup onClose={this.closeLoginConfirmation.bind(this)}>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.onLoginSuccess.bind(this)}
                onFailure={this.onLoginFailure.bind(this)}
              />
            </Popup>
          ))}
      </StyledControlPanel>
    );
  }

  openLoginConfirmation() {
    this.setState({ isLoginMode: true });
  }

  closeLoginConfirmation() {
    this.setState({ isLoginMode: false });
  }

  onLoginSuccess(googleUser) {
    console.log(googleUser);
    const { id_token } = googleUser.getAuthResponse();
    const requestBody = { idToken: id_token };
    fetch("/tokensignin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    }).then(response => {
      if (response.ok) {
        this.props.updateClockList();
      }
    });
  }

  onLoginFailure(response) {
    console.log(response);
  }

  onLogoutSuccess(response) {
    console.log(response);
  }
}
ControlPanel.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  resetShift: PropTypes.func.isRequired,
  updateClockList: PropTypes.func.isRequired
};

const Button = styled.button`
  flex-basis: 50%;
  border: 1px solid ${props => (props.isEditMode ? "#f5af5f" : "transparent")};
  background: ${props => (props.isEditMode ? "#ffe187" : "none")};
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

const StyledControlPanel = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
`;
