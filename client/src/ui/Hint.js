import React from "react";
import styled from "styled-components";

import { colors } from "ui/constants";

const Hint = ({ className }) => (
  <div className={className}>{`<< scroll >>`}</div>
);

const StyledHint = styled(Hint)`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  font-weight: 700;
  color: ${colors.text};
  opacity: 0.3;
  animation-name: emerging;
  animation-duration: 2s;

  @keyframes emerging {
    from {
      opacity: 0;
      transform: translateX(-50%) scaleX(0.5);
    }
    to {
      opacity: 0.3;
      transform: translateX(-50%);
    }
  }
`;

export { StyledHint as Hint };
