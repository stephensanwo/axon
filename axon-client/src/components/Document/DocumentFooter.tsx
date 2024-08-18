import { Box, Button, useTheme } from "@primer/react";
import { DocumentState } from "src/context/document/document.types";
import { Text } from "../Common/Text";
import OverlayMenu from "../Common/OverlayMenu";
import { PiArrowsClockwise } from "react-icons/pi";

function DocumentFooter(documentState: DocumentState) {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Text.SmallSecondary>
          Documents: {documentState.documentFolders.data.length}
        </Text.SmallSecondary>
      </Box>
      <Box>
        <Text.SmallSecondary>
          {documentState.documentFolders.selectedDocumentFolders[0]?.name}
        </Text.SmallSecondary>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box>
          <OverlayMenu
            width={400}
            minHeight={500}
            side="outside-top"
            align="center"
            anchorOffset={10}
            alignmentOffset={16}
            anchorComponent={
              <Button
                leadingVisual={() => (
                  <PiArrowsClockwise color={theme?.colors.text.gray} />
                )}
                sx={{
                  height: "31px",
                  minWidth: "48px",
                  borderRadius: 0,
                }}
                variant="invisible"
              >
                <Text.SmallSecondary>Document Status</Text.SmallSecondary>
              </Button>
            }
            heading={<Text.Heading4>Document Status</Text.Heading4>}
          >
            <Text.Small>
              This is an overlay menu. It will close when you click outside of
              it.
            </Text.Small>
          </OverlayMenu>
        </Box>
      </Box>
    </Box>
  );
}

export default DocumentFooter;
