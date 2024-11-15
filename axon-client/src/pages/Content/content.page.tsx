import Blank from "src/components/Blank";
import AxonLoader from "src/components/Loader/Loader";
import Page from "src/components/Page";
import SearchDialog from "src/components/Search/SearchDialog";
import Settings from "src/components/Settings";
import User from "src/components/User";
import Content from "src/components/Content";
import { useContent } from "src/context/content/hooks/useContent";
import Layout from "src/components/Layout";

function ContentPage() {
  const { contentList, contentTypeData } = useContent();

  console.log("contentTypeData", contentTypeData);

  if (contentTypeData.isLoading) {
    return <AxonLoader />;
  }

  if (!contentTypeData.data) {
    return (
      <Layout
        pageHeader={{
          breadcrumb: (
            <Content.Nav
              level="content"
              contentList={contentList}
              contentTypeData={contentTypeData}
            />
          ),
          menus: [
            <SearchDialog />,
            <Settings.Button type="icon" />,
            <User.Button type={"icon"} />,
          ],
        }}
        middleTopPanel={{
          enabled: true,
          component: (
            <Content.Main>
              <Blank
                heading="Content not found"
                description={`The content you are looking for does not exist\n or has been deleted.`}
                type="error"
                action={{
                  label: "Go to Contents",
                  href: "/content",
                }}
              />
            </Content.Main>
          ),
        }}
      />
    );
  }

  return (
    <Layout
      pageHeader={{
        breadcrumb: (
          <Content.Nav
            level="content"
            contentList={contentList}
            contentTypeData={contentTypeData}
          />
        ),
        menus: [
          <SearchDialog />,
          <Settings.Button type="icon" />,
          <User.Button type={"icon"} />,
        ],
      }}
      middleTopPanel={{
        enabled: true,
        component: (
          <Page.Main>
            {
              <Content.Main>
                <Content.View
                  contentTypeData={contentTypeData}
                  contentList={contentList}
                />
              </Content.Main>
            }
          </Page.Main>
        ),
      }}
    />
  );
}

export default ContentPage;
