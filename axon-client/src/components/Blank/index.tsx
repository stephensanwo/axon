import { Blankslate } from "@primer/react/drafts";
import { Box, Text, useTheme } from "@primer/react";
import { AlertIcon, InfoIcon } from "@primer/octicons-react";

function Blank(props: {
  heading: string;
  type: "error" | "info";
  description: string;
  action?: {
    label: string;
    href: string;
  };
}) {
  const { heading, type, description, action } = props;
  const { theme } = useTheme();
  const Icon = {
    error: <AlertIcon size={32} fill={theme?.colors.danger.default} />,
    info: <InfoIcon size={32} fill={theme?.colors.text.gray} />,
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        alignItems: "center",
      }}
    >
      <Blankslate>
        <Blankslate.Visual>{Icon[type]}</Blankslate.Visual>
        <Blankslate.Heading>
          <Text
            sx={{
              fontSize: 2,
            }}
          >
            {heading}
          </Text>
        </Blankslate.Heading>
        <Blankslate.Description>
          <Text
            sx={{
              fontSize: 1,
            }}
          >
            {description}
          </Text>
        </Blankslate.Description>
        {action && (
          <Blankslate.SecondaryAction href={action.href}>
            <Text
              sx={{
                fontSize: 1,
              }}
            >
              {action.label}
            </Text>
          </Blankslate.SecondaryAction>
        )}
      </Blankslate>
    </Box>
  );
}

export default Blank;
