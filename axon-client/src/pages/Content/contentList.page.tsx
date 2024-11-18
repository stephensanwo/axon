import Settings from "src/components/Settings";
import User from "src/components/User";
import Content from "src/components/Content";
import Layout from "src/components/Layout";
import { useContent } from "src/context/content/hooks/useContent";
import { useContentRoute } from "src/context/content/hooks/useContentRoute";
import { ContentRouteParams } from "src/context/content/index.types";
import SearchDialog from "src/components/Search/SearchDialog";
import { useContentStore } from "src/context/content/hooks/useContentStore";

function ContentListPage() {
  const { contentList, contentTypeData, contentFolders } = useContent();
  const { leftPanel, setLeftPanel } = useContentStore();
  const { contentId, contentFolderName, clearContentRouteSearchParams } =
    useContentRoute();
  return (
    <Layout
      pageHeader={{
        breadcrumb: <Content.Nav level="list" />,
        menus: [
          <SearchDialog />,
          // <Settings.Button type="icon" />,
          // <User.Button type={"icon"} />,
        ],
      }}
      middleTopPanel={{
        enabled: true,
        component: (
          <Content.FolderMain
            contentFolderName={contentFolderName}
            contentList={contentList}
          />
        ),
        className: "p-0",
      }}
      middleBottomPanel={{
        enabled: true,
        maxHeight: 28,
        component: <Content.ListFooter contentList={contentList} />,
        className: "p-0",
      }}
      leftPanel={{
        enabled: leftPanel,
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
        onCollapse: () => {
          setLeftPanel(false);
        },
        onExpand: () => {
          setLeftPanel(true);
        },
        className: "p-0",
      }}
      rightPanel={{
        enabled: contentId !== "",
        component: <Content.ListRight contentTypeData={contentTypeData} />,
        defaultSize: 50,
        minSize: 50,
        maxSize: 75,
        collapsible: true,
        className: "p-0",
        onCollapse: () => {
          clearContentRouteSearchParams(ContentRouteParams.CONTENT_PREVIEW);
        },
      }}
    />
  );
}

export default ContentListPage;
