/* eslint-disable react/jsx-pascal-case */
import styled from "styled-components";
import { PageContainer } from "../shared/layout";
import { FaceVeryDissatisfied } from "@carbon/pictograms-react";
import { ThemeColors } from "src/shared/themes";
import { Link } from "react-router-dom";

const DownTimePage = styled.div`
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
      <DownTimePage>
        <FaceVeryDissatisfied
          style={{
            fill: ThemeColors.dangerAction,
            width: "124px",
            height: "124px",
          }}
        />
        <h2>503 Error</h2>
        <h5>
          Sorry, the service is currently unavailable, please try again later
        </h5>
        <Link to={"/"}>Go Back Home</Link>
      </DownTimePage>
    </PageContainer>
  );
};

export default Error;
