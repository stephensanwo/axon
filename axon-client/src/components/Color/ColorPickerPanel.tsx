import { Box, FormControl, Radio } from "@primer/react";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";
import { IColorPickerProps } from "./index.types";
import "./index.css";
import { Text } from "../Common/Text";

function ColorPickerPanel({
  height,
  hideAlpha = false,
  hideInput = false,
  color,
  setColor,
  view,
  setView,
}: IColorPickerProps) {
  return (
    <Box>
      <ColorPicker
        color={color}
        onChange={setColor}
        hideAlpha={hideAlpha}
        hideInput={hideInput}
        height={height}
      />
      <Box
        sx={{
          display: "flex",
          gap: 4,
          mt: 4,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
          }}
        >
          <Text.Heading6>Color Format</Text.Heading6>
          <FormControl>
            <Radio
              name="hex"
              value={"hex"}
              onChange={() => setView("hex")}
              checked={view === "hex"}
              disabled={false}
            />
            <FormControl.Label>
              <Text.SmallSecondary>hex</Text.SmallSecondary>
            </FormControl.Label>
          </FormControl>
          <FormControl>
            <Radio
              name="rgb"
              value={"rgb"}
              onChange={() => setView("rgb")}
              checked={view === "rgb"}
              disabled={false}
            />
            <FormControl.Label>
              <Text.SmallSecondary>rgb</Text.SmallSecondary>
            </FormControl.Label>
          </FormControl>
          <FormControl>
            <Radio
              name="hsv"
              value={"hsv"}
              onChange={() => setView("hsv")}
              checked={view === "hsv"}
              disabled={false}
            />
            <FormControl.Label>
              <Text.SmallSecondary>hsv</Text.SmallSecondary>
            </FormControl.Label>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}

export default ColorPickerPanel;
