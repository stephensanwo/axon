import { PageContainer } from "src/shared/layout";
import styled from "styled-components";
import { AxonButton } from "src/components/Button";
import { LogoGithub } from "@carbon/icons-react";
import { GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from "src/config";
import { TouchId } from "@carbon/pictograms-react";
import axonLogo from "src/assets/icons/axon-logo.svg";
import { Apple, Google } from "iconsax-react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { ThemeColors } from "src/shared/themes";
import { Link } from "react-router-dom";
import AuthContext from "src/context/auth";
import React, { useEffect } from "react";
import { Hub } from "aws-amplify/utils";
import {
  signInWithRedirect,
  signOut,
  getCurrentUser,
  AuthUser,
} from "aws-amplify/auth";
import { PiGithubLogo, PiGoogleLogo } from "react-icons/pi";

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

const provider = {
  custom: "Github",
};

const SignUp = () => {
  const { isSignedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState<string>();
  console.log("isSignedIn", isSignedIn);
  if (isSignedIn) {
    return <Navigate to="/notes" />;
  }

  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [customState, setCustomState] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          getUser();
          break;
        case "signInWithRedirect_failure":
          setError("An error has occurred during the OAuth flow.");
          break;
        case "customOAuthState":
          setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
          break;
      }
    });

    getUser();

    return unsubscribe;
  }, []);

  const getUser = async (): Promise<void> => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }
  };

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
            id="Apple-auth"
            kind="primary"
            renderIcon={() => <Apple size="16" variant="Bold" />}
            iconDescription={"Sign Up"}
            // onClick={() => (window.location.href = `${GOOGLE_AUTH_URL}`)}
            onClick={() =>
              signInWithRedirect({ provider: "Apple", customState: "axon" })
            }
            disabled={loading === "google-auth" ? true : false}
            style={{ marginTop: "50px" }}
          >
            {loading === "google-auth"
              ? "Authenticating..."
              : "Continue with Apple"}
          </AxonButton>
          <AxonButton
            id="google-auth"
            kind="primary"
            renderIcon={() => <PiGoogleLogo size="16" />}
            iconDescription={"Login with Google"}
            size="md"
            onClick={(e: any) => {
              window.location.href = `${GITHUB_AUTH_URL}`;
              setLoading(e.target.id);
            }}
            // onClick={() =>
            //   signInWithRedirect({ provider: "Google", customState: "axon" })
            // }
            disabled={loading === "github-auth" ? true : false}
          >
            {loading === "github-auth"
              ? "Authenticating..."
              : "Continue with Github"}
          </AxonButton>
          <AxonButton
            id="github-auth"
            kind="primary"
            renderIcon={() => <PiGithubLogo size="16" />}
            iconDescription={"Sign Up"}
            // onClick={() => (window.location.href = `${GOOGLE_AUTH_URL}`)}
            onClick={() => signInWithRedirect({ provider })}
            disabled={loading === "google-auth" ? true : false}
          >
            {loading === "google-auth"
              ? "Authenticating..."
              : "Continue with Github"}
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
