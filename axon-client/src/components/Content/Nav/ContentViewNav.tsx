import { Truncate, useTheme } from "@primer/react";
import { useNavigate } from "react-router-dom";
import Select, { SelectMenuItem } from "src/components/Common/Select";
import { BaseContentProps } from "../index.types";

function ContentViewNav({
  navTitle,
  contentState,
}: {
  navTitle: string;
} & BaseContentProps) {
  const { theme } = useTheme();
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
      onClick: () => {},
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

export default ContentViewNav;
