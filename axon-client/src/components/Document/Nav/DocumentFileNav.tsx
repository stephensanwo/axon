import { Truncate, useTheme } from "@primer/react";
import { useNavigate } from "react-router-dom";
import Select, { SelectMenuItem } from "src/components/Common/Select";
import { useDocument } from "src/context/document/hooks/useDocument";
import { BaseDocumentProps } from "../index.types";

function DocumentFileNav({
  navTitle,
  documentState,
}: {
  navTitle: string;
} & BaseDocumentProps) {
  const { theme } = useTheme();
  const { uploadDocument } = useDocument();
  const navigate = useNavigate();
  const options: SelectMenuItem[] = [
    {
      id: "go-to-folders",
      name: "Go to Folders",
      onClick: () => {
        navigate("/documents");
      },
    },
    {
      id: "upload-document",
      name: "Upload Document",
      onClick: () => {
        uploadDocument(documentState.documentFolderFiles.folder?.id!!);
      },
    },
  ];

  return (
    <Select
      title={
        <Truncate
          title={navTitle}
          maxWidth={150}
          expandable
          sx={{
            color: theme?.colors.text.gray,
          }}
        >
          {navTitle}
        </Truncate>
      }
      menuItems={options}
      data={""}
      anchor="text"
      width={"small"}
      textProps={{ variant: "invisible" }}
    />
  );
}

export default DocumentFileNav;
