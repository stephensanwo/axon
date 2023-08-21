import React, { useContext, useState } from "react";
import RenderIcon from "src/components/EditableLabels/RenderIcon";
import NoteContext from "src/context/notes";
import { ColorPalette, ThemeColors } from "src/shared/themes";
import { NodeDataProps } from "src/types/notes";
import styled from "styled-components";

interface IconNodeData {
  data: NodeDataProps;
  selected_id: string;
  handleNodeClick: any;
  handleNodeBlur: any;
}

const IconNodeContainer = styled.div`
  border: none;
  border-radius: 0;
  padding: 0;
  width: 45px;
  height: 45px;
  padding: 16px;
  background-color: ${(props: { background: string }) =>
    props.background && props.background};
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

const IconNodeContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const IconNode: React.FC<IconNodeData> = (props) => {
  const { selectedNode } = useContext(NoteContext);
  return (
    <IconNodeContainer
      tabIndex={0}
      onClick={() => {
        props.handleNodeClick(props.selected_id);
      }}
      onDoubleClick={props.handleNodeBlur}
      active={selectedNode.id === props.data.id}
      background={props.data.node_styles.node_background_color}
      border={props.data.node_styles.node_border_color}
    >
      <IconNodeContent>
        {props.data.icon && (
          <RenderIcon
            iconName={props.data.icon}
            width={24}
            height={24}
            fill={
              props.data.node_styles.node_border_color === ""
                ? ThemeColors.textBlack
                : props.data.node_styles.node_border_color
            }
          />
        )}
      </IconNodeContent>
    </IconNodeContainer>
  );
};

export default IconNode;
