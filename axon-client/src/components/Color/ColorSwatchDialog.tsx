import { forwardRef, useState } from "react";
import ColorPickerPanel from "src/components/Color/ColorPickerPanel";
import {
  DialogBody,
  DialogContainer,
  DialogHeader,
} from "src/components/Dialog";
import { BaseDialogProps } from "src/components/Dialog/index.types";
import { useColor } from "react-color-palette";
import { AXON_TOKENS } from "src/theme/tokens";
import { Color } from "src/components/Color/index.types";
import { ColorViews } from "src/domain/settings/settings.entity";

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
          <ColorPickerPanel
            color={color}
            setColor={setColor}
            view={view}
            setView={setView}
          />
        </DialogBody>
      </DialogContainer>
    );
  }
);

export default ColorSwatchDialog;
