import { Box, IconButton, Text } from "@primer/react";
import React from "react";
import { Input } from "../Common/Input";
import { PiMagnifyingGlassBold, PiPlusBold } from "react-icons/pi";
import documentService from "src/domain/document/document.service";
import NewDocument from "./NewDocument";
import { SupportedDocumentTypes } from "src/domain/document/document.entity";

function DocumentHeader() {
  const [newDocument, setNewDocument] = React.useState<boolean>(false);
  return (
    <>
      <Box
        sx={{
          height: "80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Text
            sx={{
              fontSize: 2,
              fontWeight: 600,
            }}
          >
            Documents
          </Text>
          <Text
            sx={{
              fontSize: 0,
              fontWeight: 400,
            }}
          >
            Manage documents across your axon projects
          </Text>
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Input.Text
            label=""
            error=""
            placeholder="Search"
            value=""
            onChange={() => {}}
            leadingVisual={<PiMagnifyingGlassBold />}
          />
          <IconButton
            variant="default"
            icon={PiPlusBold}
            disabled={false}
            onClick={() =>
              documentService.uploadFile<string>(SupportedDocumentTypes)
            }
            // onClick={() => setNewDocument(true)}
            aria-label="Create New Document"
            sx={{
              flexShrink: 0,
            }}
          />
        </Box>
      </Box>
      {/* {newDocument && (
        <NewDocument toggle={newDocument} setToggle={setNewDocument} />
      )} */}
    </>
  );
}

export default DocumentHeader;
