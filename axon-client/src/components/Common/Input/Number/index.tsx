import React, { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@primer/react";
import { Text } from "src/components/Common/Text";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { Size } from "@primer/react/lib/Button/types";
import { NumberInputProps } from "./index.types";

function Number({
  id,
  initialValue,
  step,
  suffix,
  minValue,
  maxValue,
  disabled,
  buttonSize = "small",
  onChange,
}: NumberInputProps) {
  const { theme } = useTheme();
  const [value, setValue] = useState(initialValue);
  const increaseFn = () => {
    if (value + step <= maxValue) {
      setValue(value + step);
    } else setValue(maxValue);
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  const decreaseFn = () => {
    if (value - step >= minValue) {
      setValue(value - step);
    } else setValue(minValue);
  };

  const fontSize =
    buttonSize === "small" ? "14px" : buttonSize === "medium" ? "16px" : "18px";

  return (
    <Box
      id={`number-input-${id}`}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton
        id={`decrease-${id}`}
        name="Decrease"
        size={buttonSize}
        onClick={() => decreaseFn()}
        disabled={disabled}
        icon={RiSubtractFill}
        aria-label="Decrease"
      />

      <Box id={`number-input-value-${id}`}>
        <Text.Paragraph
          style={{
            color: theme?.colors.text.gray,
            fontFamily: theme?.fonts.mono,
            fontSize: fontSize,
          }}
        >{`${value}${suffix || ""}`}</Text.Paragraph>
      </Box>
      <IconButton
        id={`increase-${id}`}
        name="Increase"
        onClick={() => increaseFn()}
        disabled={disabled}
        size={buttonSize}
        aria-label="Increase"
        icon={RiAddFill}
      />
    </Box>
  );
}

export default Number;
