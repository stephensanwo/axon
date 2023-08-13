import React, { useRef, useState } from "react";
import {
  ColorPalette,
  NodeThemes,
  StateColors,
  ThemeColors,
} from "src/shared/themes";
import {
  Close,
  Draggable,
  ColorPalette as ColorPaletteIcon,
  NotebookReference,
  SubtractAlt,
} from "@carbon/icons-react";
import ContentEditable from "react-contenteditable";
import { HeaderText, ParagraphText } from "../../EditableLabels";
import Controls from "../../Controls";
import { NodeDataProps, NodeStyleProps } from "src/types/notes";
import styled from "styled-components";

interface TextBoxNodeData {
  data: NodeDataProps;
  selected_id: string;
  handleNodeClick: any;
  handleNodeDoubleClick: any;
  node_styles: NodeStyleProps;
}

const TextBoxNodeContainer = styled.div`
  border: none;
  border-radius: 0;
  padding: 0;
  width: 280px;
  min-height: 100px;
  padding: 16px;
  background-color: ${ColorPalette["green-1"].hex};
  border-radius: 8px;
`;

const TextBoxNodeContent = styled.div`
  display: flex;
  gap: 0.2rem;
  justify-content: space-between;
`;

const TextBoxNodeDragButton = styled.button`
  /* position: absolute; */
  background-color: transparent;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: absolute;
  top: 16px;
  right: 10px;
`;

const TextBoxNodeControls = styled.div`
  width: 100%;
  height: 24px;
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

const TextBoxNode: React.FC<TextBoxNodeData> = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  console.log(props);
  return (
    <TextBoxNodeContainer
      tabIndex={0}
      onClick={() => {
        props.handleNodeClick(props.selected_id);
        setIsSelected((prevState) => !prevState);
      }}
      onDoubleClick={props.handleNodeDoubleClick}
      onBlur={() => setIsSelected(false)}
    >
      <TextBoxNodeContent>
        <div
          style={{
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <HeaderText
            title={props.data.title}
            style={{ textAlign: "left" }}
          ></HeaderText>
          <ParagraphText description={props.data.description} />
          {isSelected && (
            <TextBoxNodeControls>
              <ColorPaletteIcon
                size="18"
                fill={ThemeColors.bgHiglight1}
                className="control-icons"
              />
              <NotebookReference
                size="18"
                fill={ThemeColors.bgHiglight1}
                className="control-icons"
              />
              <SubtractAlt
                size="18"
                fill={ThemeColors.bgHiglight1}
                className="control-icons"
              />
            </TextBoxNodeControls>
          )}
        </div>
        <TextBoxNodeDragButton>
          <Draggable
            size="18"
            fill={ThemeColors.bgHiglight1}
            className="control-icons"
            style={{
              cursor: "grab",
            }}
          />
        </TextBoxNodeDragButton>
      </TextBoxNodeContent>
    </TextBoxNodeContainer>
  );
};

export default TextBoxNode;
