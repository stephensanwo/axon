import Blank from "src/components/Blank";
import { ComponentState } from "src/components/Common/ComponentState";
import AxonLoader from "src/components/Loader/Loader";
import Page from "src/components/Page";
import { usePage } from "src/context/page/hooks/usePage";
import { useRef } from "react";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import Nav from "src/components/Nav";
import { useContentContext } from "src/context/content/hooks/useContentContext";
import Content from "src/components/Content";

function ContentPage() {
  const { contentState, contentStateDispatch, contentId, setContentId } =
    useContentContext();
  const { panel, togglePanel } = usePage();
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);

  console.log("contentState", contentState);

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
              level="content"
              isLoading={contentState.content.contentQuery.isLoading}
              contentState={contentState}
              contentStateDispatch={contentStateDispatch}
              contentId={contentId}
              setContentId={setContentId}
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
              level="content"
              isLoading={contentState.content.contentQuery.isLoading}
              contentState={contentState}
              contentStateDispatch={contentStateDispatch}
              contentId={contentId}
              setContentId={setContentId}
            />
          ),
          menus: [
            panel.right ? (
              <Content.PreviewOptions
                contentState={contentState}
                contentStateDispatch={contentStateDispatch}
                contentId={contentId}
                setContentId={setContentId}
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
              previewContent={contentState.contentList.previewContent!!}
            />
          </Page.Right>
        }
        main={
          <Page.Main>
            {
              <Content.Main>
                <Content.View
                  contentState={contentState}
                  contentStateDispatch={contentStateDispatch}
                  contentId={contentId}
                  setContentId={setContentId}
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
    !contentState.content.contentQuery.isFetchedAfterMount &&
    contentState.content.data === null
  ) {
    return page["loading"];
  }
  if (
    contentState.content.contentQuery.isFetchedAfterMount &&
    contentState.content.data === null
  ) {
    return page["error"];
  }
  return page["success"];
}

export default ContentPage;
