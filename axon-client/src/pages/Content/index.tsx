import Settings from "src/components/Settings";
import User from "src/components/User";
import Content from "src/components/Content";
import Layout from "src/components/Layout";
import { useContent } from "src/context/content/hooks/useContent";
import SearchDialog from "src/components/Search/SearchDialog";

function ContentIndexPage() {
  const { contentList, contentFolders } = useContent();

  return (
    <Layout
      pageHeader={{
        breadcrumb: <Content.Nav level="index" />,
        menus: [
          <SearchDialog />,
          <Settings.Button type="icon" />,
          <User.Button type={"icon"} />,
        ],
      }}
      middleTopPanel={{
        enabled: true,
        component: <Content.List.Search />,
        className: "p-0",
        defaultSize: 25,
        minSize: 25,
        maxSize: 100,
      }}
      leftPanel={{
        enabled: true,
        component: (
          <Content.Folder.Main
            contentFolders={contentFolders}
            contentList={contentList}
          />
        ),
        defaultSize: 25,
        minSize: 25,
        maxSize: 25,
        collapsible: true,
        className: "p-0",
        outerClassName: "lg:block hidden",
      }}
    />
  );
}

export default ContentIndexPage;
