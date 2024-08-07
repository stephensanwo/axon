import { Blankslate } from "@primer/react/drafts";
import { Box, useTheme } from "@primer/react";
import { AlertIcon, InfoIcon } from "@primer/octicons-react";
import { Text } from "../Common/Text";
import { PiProhibitBold } from "react-icons/pi";

function Blank(props: {
  heading: string;
  type: "error" | "info" | "notfound";
  description: string;
  action?: {
    label: string;
    href: string;
  };
}) {
  const { heading, type, description, action } = props;
  const { theme } = useTheme();
  const Icon = {
    error: <AlertIcon size={48} fill={theme?.colors.danger.default} />,
    info: <InfoIcon size={48} fill={theme?.colors.text.gray} />,
    notfound: <PiProhibitBold size={48} fill={theme?.colors.text.gray} />,
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Text.Heading5>{heading}</Text.Heading5>
          {description.split("\n").map((item, index) => (
            <Text.ParagraphSecondary key={index}>
              {item}
            </Text.ParagraphSecondary>
          ))}
          {action && (
            <Blankslate.SecondaryAction href={action.href}>
              <Text.Paragraph>{action.label}</Text.Paragraph>
            </Blankslate.SecondaryAction>
          )}
        </Box>
      </Blankslate>
    </Box>
  );
}

export default Blank;
