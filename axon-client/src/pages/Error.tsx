/* eslint-disable react/jsx-pascal-case */
import styled from "styled-components";
import { PageContainer } from "../shared/layout";
import { DoNot_02 } from "@carbon/pictograms-react";
import { Button } from "carbon-components-react";
import { ArrowRight32 } from "@carbon/icons-react";
import { Link } from "react-router-dom";

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
          style={{ fill: "#fa4d56", width: "124px", height: "124px" }}
        />
        <h2>404 Error</h2>
        <h5>Sorry, the page you are looking for does not exist</h5>
        <Button
          kind="ghost"
          renderIcon={ArrowRight32}
          iconDescription={"Go Back Home"}
          style={{ width: "200px", height: "40px" }}
          to={"/"}
          as={Link}
        >
          Go Back Home
        </Button>
      </ErrorPage>
    </PageContainer>
  );
};

export default Error;
