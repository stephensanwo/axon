/* eslint-disable react/jsx-pascal-case */
import styled from "styled-components";
import { PageContainer } from "../shared/layout";
import { DoNot_02 } from "@carbon/pictograms-react";
import { ThemeColors } from "src/shared/themes";

const ErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;
const Error = () => {
  return (
    <PageContainer dark>
      <ErrorPage>
        <DoNot_02
          style={{
            fill: ThemeColors.dangerAction,
            width: "124px",
            height: "124px",
          }}
        />
        <h2>404 Error</h2>
        <h5>Sorry, the page you are looking for does not exist</h5>
        <a href={"/"}>Go Back Home</a>
      </ErrorPage>
    </PageContainer>
  );
};

export default Error;
