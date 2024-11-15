import { Box, Button, Text, useTheme } from "@primer/react";
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
      size: 64,
      fill: theme?.colors.bg.variant1,
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
        <Text
          key={index}
          sx={{
            fontSize: "13px",
            fontWeight: 400,
            color: theme?.colors.bg.variant3,
          }}
        >
          {item}
        </Text>
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
