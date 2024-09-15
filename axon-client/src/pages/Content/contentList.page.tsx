import Blank from "src/components/Blank";
import { ComponentState } from "src/components/Common/ComponentState";
import AxonLoader from "src/components/Loader/Loader";
import Page from "src/components/Page";
import { usePage } from "src/context/page/hooks/usePage";
import { useRef } from "react";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import { Project } from "src/components/Project";
import Nav from "src/components/Nav";
import { useContentContext } from "src/context/content/hooks/useContentContext";
import Content from "src/components/Content";
import Icon from "src/components/Common/Icon";

function ContentListPage() {
  const { contentState, contentStateDispatch } = useContentContext();
  const { panel, togglePanel } = usePage();
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);

  const page: ComponentState = {
    // error and loading states are rendered within the DocumentFileList component
    empty: <></>,
    loading: <AxonLoader />,
    error: (
      <Page
        panel={panel}
        togglePanel={togglePanel}
        initialFocusRef={initialFocusRef}
        returnFocusRef={returnFocusRef}
        ignoreClickRefs={[]}
        header={{
          breadcrumb: (
            <Content.Nav
              level="list"
              isLoading={contentState.contentList.contentListQuery.isLoading}
              contentState={contentState}
              contentStateDispatch={contentStateDispatch}
            />
          ),
          menus: [
            <Search.Button type={"icon"} />,
            <Settings.Button type="icon" />,
            <User.Button type={"icon"} />,
          ],
        }}
        leftPanel={<Page.Left>{<Nav />}</Page.Left>}
        rightPanel={<Page.Right></Page.Right>}
        main={
          <Page.Main>
            {
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
          </Page.Main>
        }
        footer={
          <Page.Footer>{<Content.Footer {...contentState} />}</Page.Footer>
        }
      />
    ),
    success: (
      <Page
        panel={panel}
        togglePanel={togglePanel}
        initialFocusRef={initialFocusRef}
        returnFocusRef={returnFocusRef}
        ignoreClickRefs={[]}
        header={{
          breadcrumb: (
            <Content.Nav
              level="list"
              isLoading={contentState.contentList.contentListQuery.isLoading}
              contentState={contentState}
              contentStateDispatch={contentStateDispatch}
            />
          ),
          menus: [
            panel.right ? (
              <Content.PreviewOptions
                contentState={contentState}
                contentStateDispatch={contentStateDispatch}
                togglePanel={togglePanel}
              />
            ) : null,
            <Search.Button type={"icon"} />,
            <Settings.Button type="icon" />,
            <User.Button type={"icon"} />,
          ],
        }}
        leftPanel={<Page.Left>{<Nav />}</Page.Left>}
        rightPanel={
          <Page.Right>
            <Content.Preview
              contentState={contentState}
              contentStateDispatch={contentStateDispatch}
            />
          </Page.Right>
        }
        main={
          <Page.Main>
            {
              <Content.Main>
                <Content.ContentListHeader
                  title="Content"
                  subtitle="Manage content"
                  contentState={contentState}
                  contentStateDispatch={contentStateDispatch}
                />
                <Content.List
                  contentState={contentState}
                  contentStateDispatch={contentStateDispatch}
                  togglePanel={togglePanel}
                  isLoading={
                    contentState.contentList.contentListQuery.isLoading
                  }
                  initialSortColumn={
                    contentState.contentList.data.length > 0 ? "created" : ""
                  }
                  initialSortDirection={
                    contentState.contentList.data.length > 0
                      ? "DESC"
                      : undefined
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
            }
          </Page.Main>
        }
        footer={
          <Page.Footer>{<Content.Footer {...contentState} />}</Page.Footer>
        }
      />
    ),
  };

  if (
    !contentState.contentList.contentListQuery.isFetchedAfterMount &&
    contentState.contentList.data === null
  ) {
    return page["loading"];
  }
  if (
    contentState.contentList.contentListQuery.isFetchedAfterMount &&
    contentState.contentList.data === null
  ) {
    return page["error"];
  }
  return page["success"];
}

export default ContentListPage;
