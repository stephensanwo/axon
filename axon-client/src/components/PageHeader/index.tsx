import React from "react";
import { PageHeaderContainer, HeaderAction } from "../../shared/layout";
import { Button } from "carbon-components-react";
import styled from "styled-components";
import HeaderTitle from "../EditableLabels/HeaderTitle";
import Settings from "../Settings";

interface PageHeaderProps {
  action?: React.Dispatch<React.SetStateAction<any>>;

  theme?: "dark" | "light";
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <PageHeaderContainer>
      <div
        style={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <HeaderTitle
          title="Test"
          style={{ color: props.theme === "dark" ? "#fff" : "" }}
        />

        <Settings />
      </div>
    </PageHeaderContainer>
  );
};

export default PageHeader;
