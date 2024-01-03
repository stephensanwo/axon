import React from "react";
import IconButton from "../Button/IconButton";
import { ThemeColors } from "src/shared/themes";
import { Subtract } from "@carbon/icons-react";
import { Add } from "@carbon/icons-react";

const NumberInput: React.FC<{
  id: string;
  value: number;
  setValue: any;
  step: number;
  minValue: number;
  maxValue: number;
  suffix?: string;
  disabled?: boolean;
}> = (props) => {
  const { id, value, setValue, step, suffix, minValue, maxValue, disabled } =
    props;
  const increaseFn = () => {
    if (value + step <= maxValue) {
      setValue(value + step);
    } else setValue(maxValue);
  };
  const decreaseFn = () => {
    if (value - step >= minValue) {
      setValue(value - step);
    } else setValue(minValue);
  };

  return (
    <div
      id={`number-input-${id}`}
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <IconButton
        id={`decrease-${id}`}
        name="Decrease"
        width="24px"
        height="24px"
        background={ThemeColors.bgHighlight2}
        onClick={() => decreaseFn()}
        disabled={disabled}
      >
        <Subtract size={14} />
      </IconButton>
      <div
        id={`number-input-value-${id}`}
        style={{
          minWidth: "32px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            color: disabled ? ThemeColors.textDark : ThemeColors.white,
          }}
        >{`${value}${suffix || ""}`}</p>
      </div>
      <IconButton
        id={`increase-${id}`}
        name="Increase"
        width="24px"
        height="24px"
        background={ThemeColors.bgHighlight2}
        onClick={() => increaseFn()}
        disabled={disabled}
      >
        <Add size={14} />
      </IconButton>
    </div>
  );
};

export default NumberInput;
