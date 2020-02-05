import React from "react";
import styled from "styled-components";

import { colors } from "ui/constants";

const Header = ({ className }) => (
  <header className={className}>
    <Frame>
      <Title>
        global
        <span role="img" aria-label="logo">
          🌐
        </span>
        clock
      </Title>
    </Frame>
  </header>
);

const Frame = styled.div`
  height: 50px;
  background-color: rgba(255, 255, 255, 30%);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: skewY(-4deg);

  @media all and (min-width: 1080px) {
    transform: skewY(-3deg);
  }

  @media all and (min-width: 1366px) {
    transform: skewY(-2deg);
  }
`;

const Title = styled.h1`
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 25px;
  font-weight: 700;
  color: ${colors.text};
  margin: 0;
  opacity: 0.2;

  & span {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const StyledHeader = styled(Header)`
  position: fixed;
  width: 100%;
  height: 100px;
  background: colors.bg;
  z-index: 2;
  pointer-events: none;
`;

export { StyledHeader as Header };
