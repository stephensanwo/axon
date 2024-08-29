import { Size } from "@primer/react/lib/Button/types";

export type NumberInputProps = {
  id: string;
  initialValue: number;
  step: number;
  minValue: number;
  maxValue: number;
  onChange: (value: number) => void;
  suffix?: string;
  disabled?: boolean;
  buttonSize?: Size;
};
