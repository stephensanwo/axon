import { useNavigate } from "react-router-dom";
import { Truncate, useTheme } from "@primer/react";
import Select, { SelectMenuItem } from "src/components/Common/Select";
import { BaseDocumentProps } from "../index.types";

function DocumentFolderNav({
  navTitle,
}: {
  navTitle: string;
} & BaseDocumentProps) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const options: SelectMenuItem[] = [
    {
      id: "documents",
      name: "Go to Documents",
      onClick: () => {
        navigate("/documents");
      },
    },

    {
      id: "projects",
      name: "Projects",
      onClick: () => {
        navigate("/projects");
      },
    },
    {
      id: "content",
      name: "Content",
      onClick: () => {
        navigate("/content");
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
      width={"auto"}
      textProps={{ variant: "invisible" }}
    />
  );
}

export default DocumentFolderNav;
