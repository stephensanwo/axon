import { Text as PrimerText, TextProps, useTheme } from "@primer/react";

function Small(props: TextProps) {
  return <PrimerText {...props} sx={{ fontSize: 0 }} />;
}

function SmallSecondary(props: TextProps) {
  const { theme } = useTheme();
  return (
    <PrimerText
      {...props}
      sx={{ fontSize: 0, color: theme?.colors.text.gray }}
    />
  );
}

function Paragraph(props: TextProps) {
  return <PrimerText {...props} sx={{ fontSize: 1 }} />;
}

function ParagraphSecondary(props: TextProps) {
  const { theme } = useTheme();
  return (
    <PrimerText
      {...props}
      sx={{ fontSize: 1, color: theme?.colors.text.gray }}
    />
  );
}
function Heading4(props: TextProps) {
  return <PrimerText {...props} sx={{ fontSize: 2, fontWeight: 600 }} />;
}

function Heading5(props: TextProps) {
  return <PrimerText {...props} sx={{ fontSize: 1, fontWeight: 600 }} />;
}

function Heading6(props: TextProps) {
  return <PrimerText {...props} sx={{ fontSize: 0, fontWeight: 600 }} />;
}

export const Text = {
  Small,
  SmallSecondary,
  Heading4,
  Heading5,
  Heading6,
  Paragraph,
  ParagraphSecondary,
};
