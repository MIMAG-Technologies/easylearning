// Loader.js
import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }

  50% {
    transform: scale(1.2);
    background-color: #6793fb;
    box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
  }

  100% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }
`;

const LoaderContainer = styled.div`
  background-color: rgba(128, 128, 128, 0.553);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const DotsContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Dot = styled.div`
  height: 20px;
  width: 20px;
  margin-right: 10px;
  border-radius: 10px;
  background-color: #b3d4fc;
  animation: ${pulse} 1.5s infinite ease-in-out;

  &:last-child {
    margin-right: 0;
  }

  &:nth-child(1) {
    animation-delay: -0.3s;
  }

  &:nth-child(2) {
    animation-delay: -0.1s;
  }

  &:nth-child(3) {
    animation-delay: 0.1s;
  }
`;

const Loader = () => {
  return (
    <LoaderContainer id="Loader">
      <DotsContainer className="dots-container">
        <Dot className="dot"></Dot>
        <Dot className="dot"></Dot>
        <Dot className="dot"></Dot>
        <Dot className="dot"></Dot>
        <Dot className="dot"></Dot>
      </DotsContainer>
    </LoaderContainer>
  );
};

export default Loader;
