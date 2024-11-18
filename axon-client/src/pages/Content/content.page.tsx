import Blank from "src/components/Blank";
import AxonLoader from "src/components/Loader/Loader";
import Page from "src/components/Page";
import SearchDialog from "src/components/Search/SearchDialog";
import Settings from "src/components/Settings";
import User from "src/components/User";
import Content from "src/components/Content";
import { useContent } from "src/context/content/hooks/useContent";
import Layout from "src/components/Layout";
import { useContentStore } from "src/context/content/hooks/useContentStore";
import { useContentRoute } from "src/context/content/hooks/useContentRoute";

function ContentPage() {
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
      middleTopPanel={{
        enabled: contentId !== "",
        component: <Content.ListRight contentTypeData={contentTypeData} />,
        className: "p-0",
      }}
    />
  );
}

export default ContentPage;
