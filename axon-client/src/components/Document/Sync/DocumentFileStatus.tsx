import { ActionList, Box, Button, Token, useTheme } from "@primer/react";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { InlineSpinner } from "../../Common/Spinner";
import { PiCloudArrowUp, PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import Tabs from "src/components/Tabs";
import { AiOutlineSync } from "react-icons/ai";
import UploadDocumentFile from "./UploadDocumentFile";
import { getContentType } from "src/common/file";
import { BaseDocumentProps } from "../index.types";

function DocumentFileStatus({
  documentState,
  documentStateDispatch,
}: BaseDocumentProps) {
  const {
    documentFolderFiles: { fileStatus },
  } = documentState;
  const { theme } = useTheme();
  const tabContainerHeight = 300 - 44;
  const syncState =
    fileStatus &&
    Object.values(fileStatus).some((status) => status.status === "pending");
  const statusCount = fileStatus && Object.keys(fileStatus).length;
  return (
    <OverlayMenu
      width={300}
      minHeight={300}
      maxHeight={300}
      side="outside-top"
      anchorOffset={10}
      alignmentOffset={0}
      align="center"
      anchorComponent={
        <Button
          variant="primary"
          leadingVisual={syncState ? InlineSpinner : AiOutlineSync}
          trailingVisual={() => (
            <Text.Paragraph>{statusCount ? statusCount : ""}</Text.Paragraph>
          )}
          disabled={false}
          aria-label="Selected Folders"
          sx={{
            flexShrink: 0,
          }}
        >
          File Sync
        </Button>
      }
    >
      <Box
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs
          name="Axon Settings"
          headers={[
            {
              label: "Uploads",
              icon: <PiCloudArrowUp size={18} />,
              counter: `${statusCount ? statusCount : ""}`,
            },
          ]}
          tabContainerStyle={{
            overflowX: "scroll",
            scrollbarWidth: "none",
          }}
          tabBodyContainerStyle={{
            overflow: "scroll",
            maxHeight: tabContainerHeight,
            scrollbarWidth: "none",
          }}
          content={[
            <ActionList
              sx={{
                overflow: "scroll",
              }}
            >
              {fileStatus && statusCount && statusCount > 0 ? (
                Object.values(fileStatus).map((status, index) => (
                  <ActionList.Item
                    key={index}
                    sx={{
                      marginBottom: 2,
                    }}
                  >
                    <Text.Heading6>{status.name}</Text.Heading6>
                    <ActionList.Description
                      variant="block"
                      sx={{
                        color: theme?.colors.text.white,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Token
                        text={getContentType(status.content_type)}
                        size="medium"
                      />
                      {status.status === "pending" && "Uploading File..."}
                      {status.status === "error" && "Upload Failed"}
                      {status.status === "success" && "Uploaded Successfully"}
                    </ActionList.Description>
                    <ActionList.TrailingVisual>
                      {status.status === "pending" && (
                        <InlineSpinner
                          size={20}
                          color={theme?.colors.text.white}
                        />
                      )}
                      {status.status === "success" && (
                        <PiCheckCircle
                          size={20}
                          color={theme?.colors.success.default}
                        />
                      )}
                      {status.status === "error" && (
                        <PiWarningCircle
                          size={20}
                          color={theme?.colors.danger.default}
                        />
                      )}
                    </ActionList.TrailingVisual>
                  </ActionList.Item>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  <Text.ParagraphSecondary>No Uploads</Text.ParagraphSecondary>
                  <UploadDocumentFile
                    documentState={documentState}
                    documentStateDispatch={documentStateDispatch}
                    isIconButton={false}
                    variant="primary"
                  />
                </Box>
              )}
            </ActionList>,
          ]}
        ></Tabs>
      </Box>
    </OverlayMenu>
  );
}

const Status = {};
export default DocumentFileStatus;
