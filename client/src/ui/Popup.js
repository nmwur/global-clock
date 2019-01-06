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
  background-color: rgba(192, 192, 192, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPopup = styled(Popup)`
  width: 80%;
  max-width: 400px;
  max-height: 70%;
  background-color: white;
  overflow-y: auto;
`;

export { StyledPopup as Popup };
