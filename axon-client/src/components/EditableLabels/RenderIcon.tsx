import React from "react";
import useCarbonIcons from "src/hooks/useCarbonIcons";
import { ThemeColors } from "src/shared/themes";

interface RenderIconProps {
  iconName: string;
  width?: number;
  height?: number;
  onClick?: (iconName: string) => void;
  fill?: string;
}

const RenderIcon: React.FC<RenderIconProps> = ({
  iconName,
  width = 16,
  height = 16,
  onClick,
  fill,
}) => {
  const Icon = useCarbonIcons(iconName);

  return (
    <div>
      {onClick ? (
        <Icon
          width={width}
          height={height}
          onClick={() => onClick(iconName)}
          fill={fill || ThemeColors.white}
          style={{
            cursor: "pointer",
          }}
        />
      ) : (
        <Icon width={width} height={height} fill={fill || ThemeColors.white} />
      )}
    </div>
  );
};

export default RenderIcon;
