import { useEffect, useState } from "react";
import { NumberInputProps } from "../index.types";

export function useNumberInput({
  initialValue,
  minValue,
  maxValue,
  step,
  onChange,
}: NumberInputProps): {
  value: number;
  increase: () => void;
  decrease: () => void;
} {
  const [value, setValue] = useState(initialValue);

  const increase = () => {
    if (value + step <= maxValue) {
      setValue(value + step);
    } else setValue(maxValue);
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  const decrease = () => {
    if (value - step >= minValue) {
      setValue(value - step);
    } else setValue(minValue);
  };

  return {
    value,
    increase,
    decrease,
  };
}
