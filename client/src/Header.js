import React from "react";
import styled from "styled-components";

import { colors } from "ui/constants";

const Header = ({ className }) => (
  <header className={className}>
    <Title>
      global
      <Logo role="img" aria-label="logo">
        🌐
      </Logo>
      clock
    </Title>
  </header>
);

const Title = styled.h1`
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 25px;
  font-weight: 700;
  color: ${colors.text};
  opacity: 0.2;
  pointer-events: none;
`;

const Logo = styled.span`
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledHeader = styled(Header)`
  position: fixed;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 30%);
  z-index: 1;
  transform: skewY(-4deg);
  transform-origin: bottom 60%;
  pointer-events: none;
`;

export { StyledHeader as Header };
