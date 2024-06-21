import { Box, Text, useTheme } from "@primer/react";
import React from "react";

function Card(props: ICard) {
  const { theme } = useTheme();
  const {
    width = "150px",
    height = "150px",
    disabled = false,
    bgColor = theme?.colors.bg.variant2b,
    children,
  } = props;

  return (
    <Box
      sx={{
        bg: bgColor,
        width: width,
        height: height,
        borderRadius: 2,
        cursor: disabled ? "not-allowed" : "pointer",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child) : null
      )}
    </Box>
  );
}

function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

function CardHeader({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Text
        sx={{
          fontSize: 1,
          fontWeight: 500,
          color: theme?.colors.text.grayLight,
        }}
      >
        {children}
      </Text>
    </Box>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        sx={{
          fontSize: 0,
          color: theme?.colors.text.gray,
        }}
      >
        {children}
      </Text>
    </Box>
  );
}

function CardActions({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "25%",
      }}
    >
      {children}
    </Box>
  );
}

Card.Icon = CardIcon;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Actions = CardActions;

export default Card;
