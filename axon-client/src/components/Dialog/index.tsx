import {
  Box,
  Dialog,
  DialogProps,
  Text,
  Truncate,
  useTheme,
} from "@primer/react";

export function DialogContainer(props: DialogProps) {
  const { theme } = useTheme();
  const { sx, ...rest } = props;
  return (
    <Dialog
      sx={{
        ...sx,
        border: `1px solid ${theme?.colors.border.default}`,
        zIndex: 10050,
      }}
      {...rest}
    >
      {props.children}
    </Dialog>
  );
}

export function DialogHeader({
  header,
  id,
  subheading,
}: {
  id: string;
  header: string;
  subheading?: string;
}) {
  const { theme } = useTheme();
  return (
    <Dialog.Header id={id}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Truncate maxWidth={350} expandable={false} title={header}>
          <Text
            sx={{
              fontSize: 1,
              fontWeight: 600,
              color: theme?.colors.text,
            }}
          >
            {header}
          </Text>
        </Truncate>
        <Truncate maxWidth={350} expandable={false} title={header}>
          <Text
            sx={{
              fontSize: 0,
              color: theme?.colors.text.gray,
            }}
          >
            {subheading}
          </Text>
        </Truncate>
      </Box>
    </Dialog.Header>
  );
}

export function DialogBody({ children }: { children?: React.ReactNode }) {
  return <Box p={3}>{children}</Box>;
}

export function DialogFooter({ children }: { children?: React.ReactNode }) {
  return (
    <Box display="flex" p={3} justifyContent="flex-end">
      {children}
    </Box>
  );
}
