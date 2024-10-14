import { useNavigate } from "react-router-dom";
import { Truncate, useTheme } from "@primer/react";
import Select, { SelectMenuItem } from "src/components/Common/Select";
import { BaseContentProps } from "../index.types";

function ContentListNav({
  navTitle,
}: {
  navTitle: string;
} & BaseContentProps) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const options: SelectMenuItem[] = [
    {
      id: "content",
      name: "Go to Content",
      onClick: () => {
        navigate("/content");
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
      id: "documents",
      name: "Documents",
      onClick: () => {
        navigate("/documents");
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

export default ContentListNav;
