import SearchDialog from "src/components/Search/SearchDialog";
import Settings from "src/components/Settings";
import User from "src/components/User";
import Content from "src/components/Content";
import { useContent } from "src/context/content/hooks/useContent";
import Layout from "src/components/Layout";
import { useContentStore } from "src/context/content/hooks/useContentStore";

function ContentPage() {
  const { contentTypeData, contentList } = useContent();
  const { contentId } = useContentStore();

  console.log(contentId);

  return (
    <Layout
      pageHeader={{
        breadcrumb: (
          <Content.Nav
            level="content"
            contentTypeData={contentTypeData}
            contentList={contentList}
          />
        ),
        menus: [
          <SearchDialog />,
          <Settings.Button type="icon" />,
          <User.Button type={"icon"} />,
        ],
      }}
      middleTopPanel={{
        enabled: contentId !== "",
        component: <Content.View.Main contentTypeData={contentTypeData} />,
        className: "p-0",
        defaultSize: 25,
        minSize: 25,
        maxSize: 100,
      }}
    />
  );
}

export default ContentPage;
