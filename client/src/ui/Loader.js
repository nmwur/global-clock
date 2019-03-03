import React from "react";
import styled from "styled-components";

const frames = ["🌑", "🌒", "🌓", "🌔", "🌝", "🌖", "🌗", "🌘"];

export class Loader extends React.Component {
  state = {
    currentFrame: null
  };

  componentDidMount() {
    this.loop();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    return <StyledLoader>{this.state.currentFrame}</StyledLoader>;
  }

  loop() {
    const nextFrame = frames[Math.floor((Date.now() / 100) % frames.length)];
    this.setState({ currentFrame: nextFrame });

    !!this.timeoutId && clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.loop.bind(this), 50);
  }
}

const StyledLoader = styled.div`
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(115, 115, 115, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;
