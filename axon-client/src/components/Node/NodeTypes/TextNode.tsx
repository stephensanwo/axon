import React, { useContext, useRef, useState } from "react";
import { ColorPalette, ThemeColors } from "src/shared/themes";
import { ParagraphText } from "../../EditableLabels";
import { NodeDataProps, NodeStyleProps } from "src/types/notes";
import styled from "styled-components";
import NoteContext from "src/context/notes";

interface TextNodeData {
  data: NodeDataProps;
  selected_id: string;
  handleNodeClick: any;
  handleNodeBlur: any;
}

const TextNodeContainer = styled.div`
  border: none;
  border-radius: 0;
  padding: 0;
  width: 280px;
  min-height: 60px;
  padding: 16px;
  background-color: ${(props: { background: string }) =>
    props.background ? props.background : ""};
  border-radius: 8px;
  border: ${(props: { border: string }) =>
    props.border && `2px solid ${props.border}`};

  &::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: calc(8px / 2 + 8px);
    border: ${(props: { active: boolean }) =>
      props.active && `2px solid ${ThemeColors.white}`};
    z-index: -1;
  }

  :hover {
    &::before {
      content: "";
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border-radius: calc(8px / 2 + 8px);
      border: 2px solid ${ThemeColors.white};
      z-index: -1;
    }
  }
`;

const TextNodeContent = styled.div`
  display: flex;
  gap: 0.2rem;
  justify-content: space-between;
`;

const TextNode: React.FC<TextNodeData> = (props) => {
  const { noteDispatch, selectedNode } = useContext(NoteContext);

  const handleNodeDataMutation = (
    fieldName: "title" | "description",
    value: string
  ) => {
    if (fieldName === "title") {
      noteDispatch({
        type: "UPDATE_NODE",
        payload: {
          node_id: props.data.id,
          updated_fields: {
            title: value,
          },
        },
      });
    }

    if (fieldName === "description") {
      noteDispatch({
        type: "UPDATE_NODE",
        payload: {
          node_id: props.data.id,
          updated_fields: {
            description: value,
          },
        },
      });
    }
  };

  return (
    <TextNodeContainer
      tabIndex={0}
      onClick={() => {
        props.handleNodeClick(props.selected_id);
      }}
      onDoubleClick={props.handleNodeBlur}
      active={selectedNode.id === props.data.id}
      background={props.data.node_styles.node_background_color}
      border={props.data.node_styles.node_border_color}
    >
      <TextNodeContent>
        <div
          style={{
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <ParagraphText
            description={props.data.description}
            mutateDescription={handleNodeDataMutation}
            color={props.data.node_styles.font_color}
          />
        </div>
      </TextNodeContent>
    </TextNodeContainer>
  );
};

export default TextNode;
