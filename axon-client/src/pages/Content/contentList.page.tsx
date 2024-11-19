import Settings from "src/components/Settings";
import User from "src/components/User";
import Content from "src/components/Content";
import Layout from "src/components/Layout";
import { useContent } from "src/context/content/hooks/useContent";
import { useContentStore } from "src/context/content/hooks/useContentStore";
import SearchDialog from "src/components/Search/SearchDialog";
import { ContentRouteParams } from "src/context/content/index.types";

function ContentListPage() {
  const { contentList, contentTypeData, contentFolders } = useContent();
  const {
    leftPanel,
    setLeftPanel,
    contentId,
    contentFolderName,
    clearContentRouteSearchParams,
  } = useContentStore();

  console.log("contentId", contentId);
  const showRightPanel = contentId !== "";
  const showLeftPanel = leftPanel;

  return (
    <Layout
      pageHeader={{
        breadcrumb: <Content.Nav level="list" />,
        menus: [
          <SearchDialog />,
          <Settings.Button type="icon" />,
          <User.Button type={"icon"} />,
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
        defaultSize: 25,
        minSize: 25,
        maxSize: 100,
      }}
      middleBottomPanel={{
        enabled: true,
        maxHeight: 28,
        component: <Content.ListFooter contentList={contentList} />,
        className: "p-0",
      }}
      leftPanel={{
        enabled: showLeftPanel,
        component: (
          <Content.FolderLeft
            contentFolders={contentFolders}
            contentList={contentList}
          />
        ),
        defaultSize: 25,
        minSize: 0,
        maxSize: 25,
        collapsible: true,
        // onCollapse: () => {
        //   setLeftPanel(false);
        // },
        // onExpand: () => {
        //   setLeftPanel(true);
        //   clearContentRouteSearchParams(ContentRouteParams.CONTENT_PREVIEW);
        // },
        className: "p-0",
        outerClassName: "xl:block hidden",
      }}
      rightPanel={{
        enabled: showRightPanel,
        component: <Content.ListRight contentTypeData={contentTypeData} />,
        defaultSize: 65,
        minSize: 0,
        maxSize: 65,
        collapsible: true,
        className: "p-0",
        outerClassName: "xl:block hidden",
        // onCollapse: () => {
        //   clearContentRouteSearchParams(ContentRouteParams.CONTENT_PREVIEW);
        // },
        // onExpand: () => {
        //   setLeftPanel(false);
        // },
      }}
    />
  );
}

export default ContentListPage;
