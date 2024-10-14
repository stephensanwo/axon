import Blank from "src/components/Blank";
import AxonLoader from "src/components/Loader/Loader";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import { Project } from "src/components/Project";
import Content from "src/components/Content";
import Icon from "src/components/Common/Icon";
import Layout from "src/components/Layout";
import { useContent } from "src/context/content/hooks/useContent";
import { useContentRoute } from "src/context/content/hooks/useContentRoute";
import { ContentRouteParams } from "src/context/content/index.types";

function ContentListPage() {
  const { contentList, content } = useContent();
  const { contentPreviewId, clearContentRouteSearchParams } = useContentRoute();

  if (contentList.isLoading) {
    return <AxonLoader />;
  }

  if (contentList.isFetchedAfterMount && contentList.data === null) {
    return (
      <Layout
        pageHeader={{
          breadcrumb: (
            <Content.Nav
              level="list"
              contentList={contentList}
              content={content}
            />
          ),
          menus: [
            <Search.Button type={"icon"} />,
            <Settings.Button type="icon" />,
            <User.Button type={"icon"} />,
          ],
        }}
        middleTopPanel={
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
        }
      />
    );
  }

  return (
    <Layout
      pageHeader={{
        breadcrumb: (
          <Content.Nav
            level="list"
            contentList={contentList}
            content={content}
          />
        ),
        menus: [
          <Search.Button type={"icon"} />,
          <Settings.Button type="icon" />,
          <User.Button type={"icon"} />,
        ],
      }}
      middleTopPanel={
        contentList.data && (
          <Content.Main>
            <Content.ContentListHeader
              title="Content"
              subtitle="Manage content"
              contentList={contentList}
              content={content}
            />
            <Content.List
              contentList={contentList}
              content={content}
              initialSortColumn={contentList.data.length > 0 ? "created" : ""}
              initialSortDirection={
                contentList.data.length > 0 ? "DESC" : undefined
              }
              emptyDocumentMessage={
                <Project.Empty
                  message={
                    "You have no content \n Create a new content to get started"
                  }
                  icon={Icon.Project}
                ></Project.Empty>
              }
            />
          </Content.Main>
        )
      }
      rightPanel={{
        enabled: contentPreviewId !== "",
        component: (
          <Content.Preview content={content} contentList={contentList} />
        ),
        defaultSize: 50,
        minSize: 50,
        maxSize: 50,
        collapsible: true,
        onCollapse: () => {
          clearContentRouteSearchParams(ContentRouteParams.CONTENT_PREVIEW);
        },
      }}
    />
  );
}

export default ContentListPage;
