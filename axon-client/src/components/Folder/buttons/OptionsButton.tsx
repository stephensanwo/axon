import { Pending } from "@carbon/icons-react";
import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";

const OptionsIcon = styled(Pending)`
  fill: ${ThemeColors.textDark};
  :hover {
    fill: ${ThemeColors.primary};
  }
`;
const OptionsIconContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const OptionsButton: React.FC<{
  id: string;
  onClick: () => void;
}> = (props) => {
  return (
    <OptionsIconContainer>
      <OptionsIcon
        size="16"
        fill={ThemeColors.primary}
        onClick={props.onClick}
      />
    </OptionsIconContainer>
  );
};

export default OptionsButton;
