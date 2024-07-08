import { Text as PrimerText, TextProps, useTheme } from "@primer/react";

function SmallText(props: TextProps) {
  return <PrimerText {...props} sx={{ fontSize: 0 }} />;
}

function SmallTextSecondary(props: TextProps) {
  const { theme } = useTheme();
  return (
    <PrimerText
      {...props}
      sx={{ fontSize: 0, color: theme?.colors.text.gray }}
    />
  );
}

function Heading4(props: TextProps) {
  return <PrimerText {...props} sx={{ fontSize: 1, fontWeight: 600 }} />;
}

export const Text = {
  SmallText,
  SmallTextSecondary,
  Heading4,
};
