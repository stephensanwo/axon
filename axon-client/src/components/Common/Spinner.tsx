import { Spinner as PrimerSpinner } from "@primer/react";

export function Spinner() {
  return <PrimerSpinner size="medium" />;
}

export function InlineSpinner({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <PrimerSpinner
      size="small"
      sx={{
        width: size ? `${size}px` : "14px",
        height: size ? `${size}px` : "14px",
        color: color ? color : "auto",
      }}
    />
  );
}
