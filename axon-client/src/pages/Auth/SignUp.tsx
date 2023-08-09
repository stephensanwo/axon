import { PageContainer } from "src/shared/layout";
import styled from "styled-components";
import { AxonButton } from "src/components/Button";
import { LogoGithub } from "@carbon/icons-react";
import { GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from "src/config";
import { TouchId } from "@carbon/pictograms-react";
import axonLogo from "src/assets/icons/axon-logo.svg";
import { Google } from "iconsax-react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ThemeColors } from "src/shared/themes";
import { Link } from "react-router-dom";
import AuthContext from "src/context/auth";

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
  const { isSignedIn } = useContext(AuthContext);

  if (isSignedIn) {
    return <Navigate to="/notes" />;
  }

  return (
    <PageContainer dark>
      <SignUpContainer>
        <SignUpBox>
          <img src={axonLogo} alt="axon-logo" />
          <TouchId
            style={{
              fill: ThemeColors.primary,
              width: "80px",
              height: "80px",
              marginTop: "4rem",
            }}
          />

          <p style={{ marginTop: "2rem" }}>Create an Account or Sign In</p>
          <AxonButton
            kind="primary"
            renderIcon={() => <LogoGithub size="16" />}
            iconDescription={"Login with Github"}
            style={{ marginTop: "50px" }}
            size="md"
            onClick={() => (window.location.href = `${GITHUB_AUTH_URL}`)}
          >
            Continue with Github
          </AxonButton>
          <AxonButton
            kind="secondary"
            renderIcon={() => <Google size="16" variant="Bold" />}
            iconDescription={"Sign Up"}
            onClick={() => (window.location.href = `${GOOGLE_AUTH_URL}`)}
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
              By clicking Continue, <br /> you acknowledge that you have read
              and
              <br /> agree to Axon's{" "}
              <Link to="/terms" style={{ fontSize: "12px" }}>
                Terms & Conditions,
              </Link>{" "}
              and{" "}
              <Link to="/privacy" style={{ fontSize: "12px" }}>
                Privacy Statement
              </Link>
            </small>
          </div>
        </SignUpBox>
      </SignUpContainer>
    </PageContainer>
  );
};

export default SignUp;
