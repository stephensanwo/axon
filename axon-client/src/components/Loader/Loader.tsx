import { themeGet } from "@primer/react";
import styled, { keyframes } from "styled-components";
import axonLogoSmall from "../../assets/icons/axon-logo-small-dark.svg";

const AxonLoaderWrapper = styled.div`
  background-color: ${themeGet("colors.bg.black")};
  height: calc(100vh - 35px);
  width: 100vw;
  margin-top: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0;
    transform: translateY(0);
  }
`;

const AxonLogo = styled.img`
  animation: ${fadeInOut} 4s ease-in-out infinite;
`;

const AxonLoader = () => {
  return (
    <AxonLoaderWrapper>
      <AxonLogo
        src={axonLogoSmall}
        alt="axon-logo"
        width={"150px"}
        className="axon-logo"
      />
    </AxonLoaderWrapper>
  );
};

export default AxonLoader;
