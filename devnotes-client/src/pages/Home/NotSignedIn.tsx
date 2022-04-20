import React from "react";
import { PageContainer } from "../../shared/layout";
import { Button, TextInput, Form } from "carbon-components-react";
import { User32 } from "@carbon/icons-react";
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
            OpenFlow Notes
          </h2>
          <p>Visual brainstorming and mind mapping for developers</p>
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
          <Form
            style={{
              display: "flex",
              justifyContent: "center",
              height: "50px",
            }}
          >
            <div style={{ marginBottom: "2rem" }}>
              <TextInput
                helperText=""
                id="email"
                invalidText="Invalid error message."
                labelText=""
                placeholder="Email Address"
                onChange={""}
                style={{ height: "50px", width: "250px" }}
              />
            </div>
            <Button
              as={Link}
              to={"/notes"}
              renderIcon={User32}
              iconDescription={"Sign In"}
            >
              Request Access
            </Button>
          </Form>
        </div>
      </NotSignedInContainer>
    </PageContainer>
  );
};

export default NotSignedIn;
