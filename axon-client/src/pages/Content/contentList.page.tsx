import Settings from "src/components/Settings";
import User from "src/components/User";
import Content from "src/components/Content";
import Layout from "src/components/Layout";
import { useContent } from "src/context/content/hooks/useContent";
import { useContentStore } from "src/context/content/hooks/useContentStore";
import SearchDialog from "src/components/Search/SearchDialog";

function ContentListPage() {
  const { contentList, contentTypeData, contentFolders } = useContent();
  const { leftPanel, contentId, contentFolderName } = useContentStore();
  const showRightPanel = contentId !== "";
  const showLeftPanel = leftPanel;

  return (
    <Layout
      pageHeader={{
        breadcrumb: <Content.Nav level="list" contentList={contentList} />,
        menus: [
          <SearchDialog />,
          <Settings.Button type="icon" />,
          <User.Button type={"icon"} />,
        ],
      }}
      middleTopPanel={{
        enabled: true,
        component: (
          <Content.List.Main
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
        component: <Content.List.Footer contentList={contentList} />,
        className: "p-0",
      }}
      leftPanel={{
        enabled: showLeftPanel,
        component: (
          <Content.Folder.Main
            contentFolders={contentFolders}
            contentList={contentList}
          />
        ),
        defaultSize: 25,
        minSize: 0,
        maxSize: 25,
        collapsible: true,
        className: "p-0",
        outerClassName: "lg:block hidden",
      }}
      rightPanel={{
        enabled: showRightPanel,
        component: <Content.View.Main contentTypeData={contentTypeData} />,
        defaultSize: 50,
        minSize: 50,
        maxSize: 50,
        collapsible: true,
        className: "p-0",
        outerClassName: "xl:block hidden",
      }}
    />
  );
}

export default ContentListPage;
