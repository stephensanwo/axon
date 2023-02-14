import React from "react";
import { PageContainer } from "../../shared/layout";
import { Button } from "carbon-components-react";
import { ArrowRight32 } from "@carbon/icons-react";
import {
  Rank,
  FlowChart,
  ItInfrastructureSoftware,
  Devops,
} from "@carbon/pictograms-react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotSignedInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 600px;
  margin: auto;
  text-align: center;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  text-align: center;
`;

const NotSignedIn: React.FC = (props) => {
  return (
    <PageContainer dark>
      <NotSignedInContainer>
        <div>
          <h2
            style={{
              fontSize: "4rem",
              marginBottom: "10px",
            }}
          >
            DevNotes
          </h2>
          <p>Note Taking and Mind Mapping for Techies</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "50px",
            width: "100%",
            margin: "auto",
          }}
        >
          <IconContainer>
            <Rank fill="#66d19e" />
            <p>
              Logical Notes Taking, <br /> Knowledge Management
            </p>
          </IconContainer>
          <IconContainer>
            <ItInfrastructureSoftware fill="#66d19e" />
            <p>
              Software Architecture, <br /> Design Flows
            </p>
          </IconContainer>
          <IconContainer>
            <FlowChart fill="#66d19e" />
            <p>
              Visual Brainstorming, <br /> Idea Management
            </p>
          </IconContainer>
          <IconContainer>
            <Devops fill="#66d19e" />
            <p>
              Application Logic <br />
              Composer
            </p>
          </IconContainer>
        </div>
        <div style={{ width: "100%" }}>
          <Button
            as={Link}
            to={"/auth"}
            renderIcon={ArrowRight32}
            iconDescription={"Get Started"}
            style={{ width: "280px", height: "50px" }}
            kind="secondary"
          >
            Get Started
          </Button>
        </div>
      </NotSignedInContainer>
    </PageContainer>
  );
};

export default NotSignedIn;
