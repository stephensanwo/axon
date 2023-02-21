import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #161616;
  border-top: 1px solid #393939;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 40px;
  z-index: 90000;
`;
const Footer = () => {
  return <FooterContainer></FooterContainer>;
};

export default Footer;
