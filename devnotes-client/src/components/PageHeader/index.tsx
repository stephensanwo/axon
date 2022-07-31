import React from "react";
import { PageHeaderContainer, HeaderAction } from "../../shared/layout";
import { Button } from "carbon-components-react";
import styled from "styled-components";
import HeaderTitle from "../EditableLabels/HeaderTitle";

interface PageHeaderProps {
  action?: React.Dispatch<React.SetStateAction<any>>;
  breadcrumb: Array<{
    text: string;
    isCurrentPage: boolean;
    link?: string;
  }>;
  buttonText?: string;
  icon?: React.ReactNode;
  headerText: string;
  theme?: "dark" | "light";
}

const BreadCrumb = styled.div`
  display: flex;
`;

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <PageHeaderContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <BreadCrumb>
          {props.breadcrumb.map((item, index) => (
            <small style={{ marginRight: "4px", color: "#1192e8" }}>
              {item.text}
            </small>
          ))}
        </BreadCrumb>

        <HeaderTitle
          title={props.headerText}
          style={{ color: props.theme === "dark" ? "#fff" : "" }}
        />
      </div>
      {props.buttonText ? (
        <HeaderAction>
          <Button
            onClick={props.action}
            renderIcon={props.icon}
            iconDescription={props.buttonText}
            size={"field"}
          >
            {props.buttonText}
          </Button>
        </HeaderAction>
      ) : (
        ""
      )}
    </PageHeaderContainer>
  );
};

export default PageHeader;
