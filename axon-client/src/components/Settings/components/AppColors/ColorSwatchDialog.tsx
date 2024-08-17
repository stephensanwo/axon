import { forwardRef, useState } from "react";
import ColorPickerPanel from "src/components/ColorPicker/ColorPickerPanel";
import {
  DialogBody,
  DialogContainer,
  DialogFooter,
  DialogHeader,
} from "src/components/Dialog";
import { BaseDialogProps } from "src/components/Dialog/index.types";
import { useColor } from "react-color-palette";
import { AXON_TOKENS } from "src/theme/tokens";
import { Color } from "src/components/ColorPicker/index.types";
import { Box, Button, FormControl, Radio } from "@primer/react";
import { ColorViews } from "src/domain/settings/settings.entity";
import { Text } from "src/components/Common/Text";
import { PiCheck, PiCheckCircle } from "react-icons/pi";

const ColorSwatchDialog = forwardRef(
  (
    {
      openModal,
      closeModalFn,
      colorLabel,
      defaultColor = AXON_TOKENS.primary100,
      defaultView = "hex",
      updateColor,
    }: BaseDialogProps & {
      colorLabel: string;
      defaultColor: string;
      defaultView: ColorViews;
      updateColor: (color: Color, view: ColorViews) => void;
    },
    ref
  ) => {
    const [color, setColor] = useColor(defaultColor);
    const [view, setView] = useState(defaultView);

    return (
      <DialogContainer
        buttonRef={ref}
        isOpen={openModal}
        onDismiss={() => {
          updateColor(color, view);
          closeModalFn(false);
        }}
        aria-labelledby="Color Swatch Dialog"
        wide
      >
        <DialogHeader
          id={"color-swatch-dialog"}
          header={"Palette"}
          subheading={colorLabel}
        />
        <DialogBody>
          <ColorPickerPanel color={color} setColor={setColor} />
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
            <Button
              variant="default"
              size="small"
              trailingVisual={PiCheckCircle}
              onClick={() => {
                updateColor(color, view);
                closeModalFn(false);
              }}
            >
              <Text.Heading6Secondary>Save</Text.Heading6Secondary>
            </Button>{" "}
          </Box>
        </DialogBody>
      </DialogContainer>
    );
  }
);

export default ColorSwatchDialog;
