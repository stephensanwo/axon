import {
  Box,
  Button,
  IconButton,
  Text,
  Truncate,
  useTheme,
} from "@primer/react";
import React from "react";
import { PiX } from "react-icons/pi";

function CardButton({
  width = "125px",
  height = "120px",
  icon,
  title,
  subtitle,
  border = false,
  trailingAction,
  trailingActionComponent,
  onClick,
  containerStyle,
}: {
  width?: string;
  height?: string;
  icon: React.ReactNode;
  title?: string;
  subtitle?: string;
  border?: boolean;
  trailingAction?: () => void;
  trailingActionComponent?: React.ReactNode;
  onClick?: () => void;
  containerStyle?: React.CSSProperties;
}) {
  const { theme } = useTheme();
  return (
    <Button
      variant="invisible"
      sx={{
        height,
        minWidth: width,
        maxWidth: width,
        flexShrink: 0,
        borderRadius: 0,
        border: border ? `1px solid ${theme?.colors.border.default}` : "none",
        ":hover": {
          backgroundColor: "transparent",
          border: `1px solid ${theme?.colors.primary.default}`,
        },
        position: "relative",
        ...containerStyle,
      }}
      onClick={onClick}
    >
      {trailingAction && (
        <Box
          sx={{
            position: "absolute",
            top: 1,
            right: 1,
          }}
        >
          {trailingActionComponent ? (
            trailingActionComponent
          ) : (
            <IconButton
              as="div"
              variant="invisible"
              size="small"
              aria-label="Remove"
              icon={() => <PiX size={14} color={theme?.colors.text.gray} />}
              sx={{
                borderRadius: "50%",
                width: "20px",
                height: "20px",
              }}
              onClick={(event) => {
                event.stopPropagation();
                trailingAction?.();
              }}
            />
          )}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {icon}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {title && (
            <Truncate maxWidth={95} expandable={false} title={title}>
              <Text
                sx={{
                  fontSize: 0,
                  fontWeight: 400,
                  color: theme?.colors.text.gray,
                }}
              >
                {title}
              </Text>
            </Truncate>
          )}
          {subtitle && (
            <Truncate maxWidth={120} expandable={false} title={subtitle}>
              <Text
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: theme?.colors.text.gray,
                }}
              >
                {subtitle}
              </Text>
            </Truncate>
          )}
        </Box>
      </Box>
    </Button>
  );
}

export default CardButton;
