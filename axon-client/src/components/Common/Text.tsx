import { Text as PrimerText, TextProps, useTheme } from "@primer/react";

function Small(props: TextProps) {
  return <PrimerText {...props} sx={{ fontSize: 0, ...props.sx }} />;
}

function SmallSecondary(props: TextProps) {
  const { theme } = useTheme();
  return (
    <PrimerText
      {...props}
      sx={{ fontSize: 0, color: theme?.colors.text.gray, ...props.sx }}
    />
  );
}

function Paragraph(props: TextProps) {
  return <PrimerText {...props} sx={{ fontSize: 1, ...props.sx }} />;
}

function ParagraphSecondary(props: TextProps) {
  const { theme } = useTheme();
  return (
    <PrimerText
      {...props}
      sx={{ fontSize: 1, color: theme?.colors.text.gray, ...props.sx }}
    />
  );
}

function Heading4(props: TextProps) {
  return (
    <PrimerText {...props} sx={{ fontSize: 2, fontWeight: 600, ...props.sx }} />
  );
}

function Heading4Secondary(props: TextProps) {
  const { theme } = useTheme();
  return (
    <PrimerText
      {...props}
      sx={{
        fontSize: 2,
        color: theme?.colors.text.gray,
        fontWeight: 600,
        ...props.sx,
      }}
    />
  );
}

function Heading5(props: TextProps) {
  return (
    <PrimerText {...props} sx={{ fontSize: 1, fontWeight: 600, ...props.sx }} />
  );
}

function Heading5Secondary(props: TextProps) {
  const { theme } = useTheme();
  return (
    <PrimerText
      {...props}
      sx={{
        fontSize: 1,
        color: theme?.colors.text.gray,
        fontWeight: 600,
        ...props.sx,
      }}
    />
  );
}

function Heading6(props: TextProps) {
  return (
    <PrimerText {...props} sx={{ fontSize: 0, fontWeight: 600, ...props.sx }} />
  );
}

function Heading6Secondary(props: TextProps) {
  const { theme } = useTheme();
  return (
    <PrimerText
      {...props}
      sx={{
        fontSize: 0,
        color: theme?.colors.text.gray,
        fontWeight: 600,
        ...props.sx,
      }}
    />
  );
}

export const Text = {
  Small,
  SmallSecondary,
  Heading4,
  Heading4Secondary,
  Heading5,
  Heading5Secondary,
  Heading6,
  Heading6Secondary,
  Paragraph,
  ParagraphSecondary,
};
