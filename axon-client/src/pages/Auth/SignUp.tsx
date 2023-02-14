import React from "react";
import { PageContainer } from "../../shared/layout";
import styled from "styled-components";
import { Button } from "carbon-components-react";
import { LogoGithub32, LogoGoogle32 } from "@carbon/icons-react";
import { GITHUB_AUTH_URL } from "../../config";
import { Link } from "react-router-dom";
import { ThemeColors } from "../../shared/themes";
import axonLogo from "../../assets/icons/axon-logo.svg";

const SignUpContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  padding-top: 5%;
`;

const SignUpBox = styled.div`
  max-width: 90%;
  padding: 20px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUp = () => {
  return (
    <PageContainer dark>
      <SignUpContainer>
        <SignUpBox>
          <img src={axonLogo} alt="axon-logo" />
          <p style={{ marginTop: "4rem" }}>Create an Account or Sign In</p>
          <a
            style={{ textDecoration: "none" }}
            href={`${GITHUB_AUTH_URL}`}
          >
            <Button
              kind="secondary"
              renderIcon={LogoGithub32}
              iconDescription={"Login with Github"}
              style={{ marginTop: "50px" }}
              size="md"
            >
              Continue with Github
            </Button>
          </a>
          <a style={{ textDecoration: "none" }} href={`abx`}>
            <Button
              kind="secondary"
              renderIcon={LogoGoogle32}
              iconDescription={"Login with Google"}
              style={{ marginTop: "25px" }}
              size="md"
              disabled
            >
              Continue with Google
            </Button>
          </a>

          <div
            style={{
              marginTop: "50px",
              width: "350px",
            }}
          >
            <small>
              By clicking Continue, <br /> you acknowledge that you have read,
              understood <br /> and agree to Axon's{" "}
              <a href="/terms" style={{ fontSize: "12px" }}>
                Terms & Conditions
              </a>
            </small>
          </div>
        </SignUpBox>
      </SignUpContainer>
    </PageContainer>
  );
};

export default SignUp;
