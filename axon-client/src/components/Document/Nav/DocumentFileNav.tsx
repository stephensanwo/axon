import { Truncate, useTheme } from "@primer/react";
import Select, { SelectMenuItem } from "src/components/Common/Select";
import { useDocument } from "src/context/document/hooks/useDocument";
import { BaseDocumentProps } from "../index.types";

function DocumentFileNav({
  navTitle,
  documentFiles,
}: {
  navTitle: string;
} & BaseDocumentProps) {
  const { theme } = useTheme();
  const { uploadDocument } = useDocument();
  const options: SelectMenuItem[] = [
    {
      id: "upload-document",
      name: "Upload Document",
      onClick: () => {
        uploadDocument(
          documentFiles.data?.folder?.id!!,
          documentFiles.data?.folder?.name!!
        );
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
