import React from "react";
import styled from "styled-components";

const Hint = ({ className }) => (
  <div className={className}>
    <span role="img" aria-label="left">
      ⬅️
    </span>
    <Appeal>scroll</Appeal>
    <span role="img" aria-label="right">
      ➡️
    </span>
  </div>
);

const Appeal = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;

const StyledHint = styled(Hint)`
  position: absolute;
  left: 50%;
  bottom: 100px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
  font-size: 24px;
  animation-name: fade;
  animation-duration: 2s;
  opacity: 0;

  @keyframes fade {
    0% {
      opacity: 0;
      transform: translateX(-50%);
    }
    40% {
      opacity: 0.5;
      transform: translateX(-50%);
    }
    60% {
      opacity: 0.5;
      transform: translateX(-50%);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) scaleX(1.5);
    }
  }
`;

export { StyledHint as Hint };
