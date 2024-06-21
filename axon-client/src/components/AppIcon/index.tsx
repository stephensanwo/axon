import { Box, useTheme } from "@primer/react";
import AxonIcon from "src/assets/icons/axon-icon.svg";

const AppIcon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (
  props
) => {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme?.colors.fg.variant1,
        width: "24px",
        height: "24px",
        borderRadius: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={AxonIcon}
        alt="axon-logo"
        style={{
          width: "14px",
          height: "14px",
          cursor: "pointer",
        }}
        {...props}
      />
    </Box>
  );
};

export default AppIcon;
