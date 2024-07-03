import { Box } from "@primer/react";
import DocumentHeader from "./DocumentHeader";
import DocumentList from "./DocumentList";
import { DocumentState } from "src/context/document/document.types";

export function Document(documentState: DocumentState) {
  const { documents } = documentState;
  console.log("documents in page===>", documents);
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        pl: 3,
        pr: 3,
      }}
    >
      <DocumentHeader />
      {documentState.query.isLoading ? (
        <>Loading</>
      ) : documentState.documents.length > 0 ? (
        <DocumentList documents={documents} />
      ) : (
        <>Blank</>
      )}
    </Box>
  );
}
