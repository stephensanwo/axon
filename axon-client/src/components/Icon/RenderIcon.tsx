import React from "react";
import useCarbonIcons from "src/hooks/useCarbonIcons";
import { ThemeColors } from "src/shared/themes";

interface RenderIconProps {
  iconName: string;
  size: string;
  fill?: string;
}

const RenderIcon: React.FC<RenderIconProps> = (props) => {
  const { iconName, fill, size } = props;
  const Icon = useCarbonIcons(iconName);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Icon size={size} fill={fill || ThemeColors.border} />
    </div>
  );
};

export default RenderIcon;
