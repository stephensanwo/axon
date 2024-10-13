import { Truncate, useTheme } from "@primer/react";
import Select, { SelectMenuItem } from "src/components/Common/Select";
import { BaseProjectProps } from "../index.types";
import { useNavigate } from "react-router-dom";

function ProjectFoldersNav({
  navTitle,
}: {
  navTitle: string;
} & BaseProjectProps) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const options: SelectMenuItem[] = [
    {
      id: "projects",
      name: "Go to Projects",
      onClick: () => {
        navigate("/projects");
      },
    },

    {
      id: "documents",
      name: "Documents",
      onClick: () => {
        navigate("/documents");
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

export default ProjectFoldersNav;
