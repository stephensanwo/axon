import { useState, useCallback } from "react";
import { flushSync } from "react-dom";

interface NumberInputHookProps {
  initialValue: number;
  step: number;
  minValue: number;
  maxValue: number;
  onChange: (value: number) => void;
}

export function useNumberInput({
  initialValue,
  step,
  minValue,
  maxValue,
  onChange,
}: NumberInputHookProps) {
  const [value, setValue] = useState(initialValue);

  const handleIncrease = useCallback(() => {
    setValue((prevValue) => {
      const newValue =
        prevValue + step <= maxValue ? prevValue + step : maxValue;
      flushSync(() => {
        onChange(newValue);
      });
      return newValue;
    });
  }, [step, maxValue, onChange]);

  const handleDecrease = useCallback(() => {
    setValue((prevValue) => {
      const newValue =
        prevValue - step >= minValue ? prevValue - step : minValue;
      flushSync(() => {
        onChange(newValue);
      });
      return newValue;
    });
  }, [step, minValue, onChange]);

  return { value, handleIncrease, handleDecrease };
}
