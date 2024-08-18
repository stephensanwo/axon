import { Box, Text, useTheme } from "@primer/react";

type InlineHeaderProps = {
  title?: string;
  subtitle?: string;
  styles?: React.CSSProperties;
};

export function InlineHeader(props: InlineHeaderProps) {
  const { title, subtitle, styles } = props;
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        marginBottom: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        ...styles,
      }}
    >
      {title && (
        <Text fontSize={1} fontWeight="bold">
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          fontSize={0}
          sx={{
            color: theme?.colors.text.gray,
          }}
        >
          {subtitle}
        </Text>
      )}
    </Box>
  );
}
