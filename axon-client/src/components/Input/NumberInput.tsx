import React from "react";
import { IconButton, useTheme } from "@primer/react";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";

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
  const { theme } = useTheme();
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
        gap: 8,
        alignItems: "center",
        height: "28px",
      }}
    >
      <IconButton
        id={`decrease-${id}`}
        name="Decrease"
        size="small"
        onClick={() => decreaseFn()}
        disabled={disabled}
        icon={RiSubtractFill}
        aria-label="Decrease"
      />

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
            color: disabled ? theme?.colors.gray : theme?.colors.gray,
          }}
        >{`${value}${suffix || ""}`}</p>
      </div>
      <IconButton
        id={`increase-${id}`}
        name="Increase"
        onClick={() => increaseFn()}
        disabled={disabled}
        size="small"
        aria-label="Increase"
        icon={RiAddFill}
      />
    </div>
  );
};

export default NumberInput;
