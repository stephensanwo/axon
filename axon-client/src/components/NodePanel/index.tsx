import { HeaderPanel } from "@carbon/react";
import { NoteContext } from "../../context/notes";
import React, { Fragment, useContext, useEffect, useState } from "react";
import "./style.scss";
import MarkdownNotes from "../MarkdownNotes";
import styled from "styled-components";
import { ThemeColors } from "src/shared/themes";
import NodeStyles from "../NodeStyles";
import Settings from "../Settings";

interface Props {
  expanded: boolean;
}

const StyledHeaderPanel = styled(HeaderPanel)`
  width: ${(props: { width: Number }) => `${props.width}px`};
  background-color: ${ThemeColors.bgDark};
`;

const NodePanel: React.FC<Props> = (props) => {
  const { selectedNode, nodePanel, setNodePanel } = useContext(NoteContext);
  const [panelExpandLevel, setPanelExpandLevel] = useState<number>();

  useEffect(() => {
    setPanelExpandLevel(nodePanel.styles || nodePanel.settings ? 260 : 600);
  }, [props.expanded, nodePanel]);

  const handlePanelExpand = () => {
    setPanelExpandLevel(window.innerWidth);
  };

  const handlePanelClose = () => {
    setPanelExpandLevel((prevState) => {
      if (prevState === 0) {
        return 0;
      } else if (prevState === 600 || prevState === 260) {
        setNodePanel({
          ...nodePanel,
          toogle: false,
          markdown: false,
          styles: false,
          settings: false,
        });
        return 0;
      } else {
        return 600;
      }
    });
  };

  return (
    <StyledHeaderPanel
      expanded={props.expanded}
      width={props.expanded && panelExpandLevel}
    >
      {nodePanel.toogle && nodePanel.markdown ? (
        <MarkdownNotes
          header={"Markdown"}
          selectedNodeId={selectedNode?.id}
          content={selectedNode}
          toggleOpen={handlePanelExpand}
          toggleClose={handlePanelClose}
        ></MarkdownNotes>
      ) : nodePanel.toogle && nodePanel.styles ? (
        <NodeStyles
          header={"Styles"}
          content={selectedNode}
          toggleClose={handlePanelClose}
        ></NodeStyles>
      ) : nodePanel.toogle && nodePanel.settings ? (
        <Settings header={"Settings"} toggleClose={handlePanelClose}></Settings>
      ) : (
        <Fragment></Fragment>
      )}
    </StyledHeaderPanel>
  );
};

export default NodePanel;
