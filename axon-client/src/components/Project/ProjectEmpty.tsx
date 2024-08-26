import { Box, Button, useTheme } from "@primer/react";
import { Text } from "../Common/Text";
import { createElement } from "react";

function ProjectEmpty({
  message,
  icon,
  primaryAction,
}: {
  message: string;
  icon: React.ElementType;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
}) {
  const { theme } = useTheme();
  const Icon = () =>
    createElement(icon, {
      size: 48,
      fill: theme?.colors.text.gray,
    });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginBottom: 2,
        }}
      >
        <Icon />
      </Box>
      {message.split("\n").map((item, index) => (
        <Text.ParagraphSecondary key={index}>{item}</Text.ParagraphSecondary>
      ))}
      <Box
        sx={{
          marginTop: 2,
        }}
      >
        {primaryAction && (
          <Button
            variant="invisible"
            onClick={primaryAction?.onClick}
            size="small"
          >
            {primaryAction?.label}
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default ProjectEmpty;
