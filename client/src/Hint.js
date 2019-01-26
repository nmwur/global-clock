import React from "react";
import styled from "styled-components";

const Hint = ({ className }) => (
  <div className={className}>{"<< scroll >>"}</div>
);

const StyledHint = styled(Hint)`
  position: fixed;
  width: 100%;
  text-align: center;
  bottom: 80px;
  pointer-events: none;
  font-size: 24px;
  font-weight: 600;
  color: white;
  animation-name: fade;
  animation-duration: 2s;
  opacity: 0;

  @keyframes fade {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0.7;
    }
    60% {
      opacity: 0.7;
    }
    100% {
      opacity: 0;
      transform: scaleX(1.3);
    }
  }
`;

export { StyledHint as Hint };
