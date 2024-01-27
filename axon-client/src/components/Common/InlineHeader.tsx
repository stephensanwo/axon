import { Box, Text, useTheme } from "@primer/react";

type InlineHeaderProps = {
  title?: string;
  subtitle?: string;
};

export function InlineHeader(props: InlineHeaderProps) {
  const { title, subtitle } = props;
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
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
