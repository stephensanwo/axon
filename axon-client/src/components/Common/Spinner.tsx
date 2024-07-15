import { Spinner as PrimerSpinner } from "@primer/react";

export function Spinner() {
  return <PrimerSpinner size="medium" />;
}

export function InlineSpinner() {
  return (
    <PrimerSpinner
      size="small"
      sx={{
        width: "14px",
        height: "14px",
      }}
    />
  );
}
