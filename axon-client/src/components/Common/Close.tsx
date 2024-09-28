import { IconButton, IconButtonProps, useTheme } from "@primer/react";
import React from "react";
import { PiX } from "react-icons/pi";

function Close(props: Partial<IconButtonProps>) {
  const { theme } = useTheme();
  const { onClick, sx, size = "small" } = props;
  return (
    <IconButton
      as="div"
      variant="invisible"
      size={size}
      aria-label={"Close"}
      icon={() => <PiX size={16} color={theme?.colors.text.gray} />}
      sx={{
        ...sx,
      }}
      onClick={onClick}
    />
  );
}

export default Close;
