import React, { useState } from "react";
import styled from "styled-components";
import NotSignedIn from "./NotSignedIn";

export const HomeDiv = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-right: 3.5%;
  padding-left: 3.5%;
  padding-top: 40px;
`;

export interface UserStateProps {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  return (
    <HomeDiv>
      <NotSignedIn />
    </HomeDiv>
  );
};

export default Home;
