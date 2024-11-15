import { ButtonGroup, IconButton, useTheme } from "@primer/react";
import { useNode } from "src/context/node/useNode";
import { defaultNodeTypes } from "src/domain/node/node.defaults";
import styled from "styled-components";

const StyledButtonGroup = styled(ButtonGroup)`
  > :last-child {
    border-bottom-left-radius: 6px !important;
    border-bottom-right-radius: 6px !important;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
  }
  > :first-child {
    border-top-left-radius: 6px !important;
    border-top-right-radius: 6px !important;
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }
`;

const Selector = () => {
  const { createNewNode } = useNode();
  const { theme } = useTheme();
  return (
    <StyledButtonGroup
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100px",
        top: "15%",
        marginLeft: "15px",
        borderRadius: 1,
        position: "absolute",
        left: 0,
        zIndex: 1000,
      }}
    >
      {defaultNodeTypes.map((node, index) => (
        <IconButton
          id={node.id}
          name={node.name}
          onClick={() => {
            createNewNode(node.nodeType, node.nodeContentType);
          }}
          size="medium"
          icon={node.icon}
          aria-label={node.description}
          sx={{
            flexShrink: 0,
          }}
        />
      ))}
    </StyledButtonGroup>
  );
};

export default Selector;
