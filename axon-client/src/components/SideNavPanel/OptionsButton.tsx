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
  action: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}> = ({ action, ...props }) => {
  return (
    <OptionsIconContainer {...props}>
      <OptionsIcon
        size="16"
        fill={ThemeColors.primary}
        onClick={() => action(true)}
      />
    </OptionsIconContainer>
  );
};

export default OptionsButton;
