import {
  Box,
  Dialog,
  DialogProps,
  Text,
  Truncate,
  useTheme,
} from "@primer/react";

export function DialogContainer(props: DialogProps) {
  return <Dialog {...props}>{props.children}</Dialog>;
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
          {header}
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
    <Box display="flex" mt={1} p={3} justifyContent="flex-end">
      {children}
    </Box>
  );
}
