import { useNavigate } from "react-router-dom";
import { Truncate, useTheme } from "@primer/react";
import Select, { SelectMenuItem } from "src/components/Common/Select";
import { useContentStore } from "src/context/content/hooks/useContentStore";
import { Text } from "src/components/Common/Text";

function ContentListNav({
  navTitle,
  listTitle,
  level,
}: {
  navTitle: string;
  listTitle: string;
  level: "list" | "content" | "index";
}) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { leftPanel, setLeftPanel } = useContentStore();
  const indexOptions: SelectMenuItem[] = [
    {
      id: "content",
      name: "Go to Content",
      onClick: () => {
        navigate("/content");
      },
    },
    {
      id: "content-folders",
      name: `${leftPanel ? "Close" : "Open"} Content Folders`,
      onClick: () => {
        setLeftPanel(!leftPanel);
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

  const listOptions: SelectMenuItem[] = [
    {
      id: "content",
      name: "Go to Content",
      onClick: () => {
        navigate("/content");
      },
    },
  ];

  return (
    <>
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
        menuItems={indexOptions}
        data={""}
        anchor="text"
        width={"auto"}
        textProps={{ variant: "invisible" }}
      />
      {level !== "index" && (
        <>
          <Text.SmallSecondary>/</Text.SmallSecondary>
          <Select
            title={
              <Truncate
                title={listTitle}
                maxWidth={150}
                expandable
                sx={{
                  color: theme?.colors.text.gray,
                }}
              >
                {listTitle}
              </Truncate>
            }
            menuItems={listOptions}
            data={""}
            anchor="text"
            width={"auto"}
            textProps={{ variant: "invisible" }}
          />
        </>
      )}
    </>
  );
}

export default ContentListNav;
