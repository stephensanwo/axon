import { HeaderPanel } from "@carbon/react";
import { Close } from "@carbon/icons-react";
import styled from "styled-components";

interface Props {
  expanded: boolean;
  toggleControlPanel: () => void;
  children?: React.ReactNode;
}

const ControlPanelContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const ControlPanelContent = styled.div`
  width: 100%;
  min-height: 95%;
  overflow-y: scroll;
`;

const ControlPanel: React.FC<Props> = (props) => {
  return (
    <HeaderPanel
      expanded={props.expanded}
      aria-label="Header Panel"
      style={{ marginTop: "40px" }}
      onHeaderPanelFocus={() => {}} // Needed for Carbon Error: onHeaderPanelFocus is not a function
    >
      <ControlPanelContainer>
        <div
          style={{
            width: "100%",
            height: "24px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Close
            size={24}
            className="icon-button"
            onClick={props.toggleControlPanel}
          />
        </div>
        <ControlPanelContent>{props.children}</ControlPanelContent>
      </ControlPanelContainer>
    </HeaderPanel>
  );
};

export default ControlPanel;
