import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Popup = ({ onClose, children, className }) => {
  let popup = null;
  const closePopupHandler = event => {
    if (!popup.contains(event.target)) {
      onClose();
    }
  };

  return (
    <Background onClick={closePopupHandler}>
      <div ref={el => (popup = el)} className={className}>
        {children}
      </div>
    </Background>
  );
};
Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

const Background = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(115, 115, 115, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;

  animation-name: opacityOn;
  animation-duration: 200ms;
  animation-fill-mode: forwards;

  @keyframes opacityOn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const StyledPopup = styled(Popup)`
  max-width: 90%;
  max-height: 80%;
  background-color: white;
  overflow-y: auto;
  box-shadow: 0px 0px 60px -10px rgba(0, 0, 0, 0.7);
`;

export { StyledPopup as Popup };
