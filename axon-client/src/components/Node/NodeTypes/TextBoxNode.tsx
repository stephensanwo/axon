import React, { useRef } from "react";
import { NodeDataProps, NodeStyleProps } from "../../../context/notes";
import { NodeThemes, StateColors } from "../../../shared/themes";
import {
  Code24,
  DataBase24,
  Cloud24,
  BareMetalServer24,
  ApplicationWeb24,
  Notebook24,
  Close24,
} from "@carbon/icons-react";
import ContentEditable from "react-contenteditable";
import { HeaderText, LabelText, ParagraphText } from "../../EditableLabels";
import Controls from "../../Controls";

interface TextBoxNodeData {
  data: NodeDataProps;
  selected_id: string;
  handleNodeClick: any;
  handleNodeDoubleClick: any;
  node_styles: NodeStyleProps;
}

const TextBoxNode: React.FC<TextBoxNodeData> = (props) => {
  console.log(props);
  return (
    <div
      className={`node-container`}
      onClick={() => props.handleNodeClick(props.selected_id)}
      onDoubleClick={props.handleNodeDoubleClick}
      style={props.node_styles?.background_styles}
    >
      <div className="node-content">
        <div style={{ padding: 0 }}>
          <LabelText
            label={props.data.label}
            style={props.node_styles?.label_styles}
          />
          <HeaderText
            title={props.data.title}
            style={{ textAlign: "left" }}
          ></HeaderText>
          <ParagraphText
            description={props.data.description}
            style={props.node_styles?.description_styles}
          />
        </div>
        <button className="edgebutton">
          <Close24 />
        </button>{" "}
      </div>
    </div>
  );
};

export default TextBoxNode;
