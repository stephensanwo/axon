import { PageContainer } from "shared/layout";
import styled from "styled-components";
import { AxonButton } from "components/Button";
import { LogoGithub } from "@carbon/icons-react";
import { GITHUB_AUTH_URL } from "config";
import { Link } from "react-router-dom";
import axonLogo from "assets/icons/axon-logo.svg";

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
          <AxonButton
            kind="primary"
            renderIcon={() => <LogoGithub size="16" />}
            iconDescription={"Login with Github"}
            style={{ marginTop: "50px" }}
            size="md"
            href={`${GITHUB_AUTH_URL}`}
          >
            Continue with Github
          </AxonButton>
          <AxonButton
            kind="secondary"
            renderIcon={() => <LogoGithub size="16" />}
            iconDescription={"Sign Up"}
            onClick={() => <Link to="/" />}
            href="/"
            disabled
          >
            Continue with Google
          </AxonButton>
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
