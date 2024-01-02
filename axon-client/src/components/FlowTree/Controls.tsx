import { Controls as ReactFlowControls } from "reactflow";
import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";

const Controls = styled(ReactFlowControls)`
  left: 10px;
  border-radius: 4px;
  background-color: ${ThemeColors.bgDark2};

  > button {
    background-color: ${ThemeColors.bgDark2};
    border: none;
    border-radius: 4px;

    :hover {
      background-color: ${ThemeColors.bgHighlight2};
    }
    > svg {
      fill: ${ThemeColors.textDark};
    }
  }
`;

export const AxonControls = () => {
  return <Controls showInteractive={true}></Controls>;
};
