import { Box, FormControl, Text, TextInput, useTheme } from "@primer/react";
import React from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { AXON_TOKENS } from "src/theme/tokens";
import { validateHexColor } from "src/utils/styles";
import { IColorPickerProps } from "./index.types";
import "./index.css";

function ColorPickerPanel({
  height,
  hideAlpha = false,
  hideInput = true,
  defaultColor = AXON_TOKENS.primary100,
}: IColorPickerProps) {
  const { theme } = useTheme();
  const [color, setColor] = useColor(defaultColor);

  return (
    <Box
      sx={{
        backgroundColor: theme?.colors.bg.variant2b,
        pb: "10px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      }}
    >
      <ColorPicker
        color={color}
        onChange={setColor}
        hideAlpha={hideAlpha}
        hideInput={hideInput}
        height={height}
      />
      <FormControl
        sx={{
          mt: 2,
        }}
      >
        <FormControl.Label
          sx={{
            fontSize: 0,
            fontWeight: "normal",
          }}
          visuallyHidden
        >
          Create Custom Color
        </FormControl.Label>
        <TextInput
          placeholder="Paste custom hex i.e #000000"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          autoSave="off"
          autoFocus={false}
          monospace
          block
          value={color.hex}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setColor((prev) => {
              return {
                ...prev,
                hex: e.target.value,
              };
            });
          }}
          sx={{
            fontSize: 0,
            flex: 1,
            width: "calc(100% - 20px)",
            margin: "0 auto",
            // backgroundColor: theme?.colors.bg.variant2b,
            // bg: theme?.colors.bg.variant2b,
          }}
          size="medium"
          trailingAction={
            <Box
              sx={{
                backgroundColor: color.hex ?? theme?.colors.bg.variant2,
                color: theme?.colors.bg.variant2,
                width: "120px",
                height: "30px",
                p: 1,
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                alert("clicked");
              }}
            >
              <Text>Add Color</Text>
            </Box>
          }
        />
        {!validateHexColor(color.hex) && (
          <FormControl.Validation variant="error">
            Invalid HEX Color
          </FormControl.Validation>
        )}
      </FormControl>
    </Box>
  );
}

export default ColorPickerPanel;
