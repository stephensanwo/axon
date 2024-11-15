import Settings from "src/components/Settings";
import User from "src/components/User";
import Content from "src/components/Content";
import Layout from "src/components/Layout";
import { useContent } from "src/context/content/hooks/useContent";
import { useContentRoute } from "src/context/content/hooks/useContentRoute";
import { ContentRouteParams } from "src/context/content/index.types";
import SearchDialog from "src/components/Search/SearchDialog";

function ContentIndexPage() {
  const { contentList, contentTypeData, contentFolders } = useContent();
  const { contentId, contentFolderName, clearContentRouteSearchParams } =
    useContentRoute();

  return (
    <Layout
      pageHeader={{
        breadcrumb: <Content.Nav level="list" />,
        menus: [
          <SearchDialog />,
          //   <Settings.Button type="icon" />,
          //   <User.Button type={"icon"} />,
        ],
      }}
      middleTopPanel={{
        enabled: true,
        component: <Content.IndexMain />,
        className: "p-0",
      }}
      leftPanel={{
        enabled: true,
        component: (
          <Content.FolderLeft
            contentFolders={contentFolders}
            contentList={contentList}
          />
        ),
        defaultSize: 25,
        minSize: 25,
        maxSize: 25,
        collapsible: true,
        className: "p-0",
      }}
    />
  );
}

export default ContentIndexPage;
