import Blank from "src/components/Blank";
import AxonLoader from "src/components/Loader/Loader";
import Page from "src/components/Page";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import Content from "src/components/Content";
import { useContent } from "src/context/content/hooks/useContent";
import { useContentRoute } from "src/context/content/hooks/useContentRoute";
import Layout from "src/components/Layout";
import { ContentRouteParams } from "src/context/content/index.types";

function ContentPage() {
  const { contentList, content } = useContent();
  const { contentName, contentPreviewId, clearContentRouteSearchParams } =
    useContentRoute();

  if (contentList.isLoading) {
    return <AxonLoader />;
  }

  if (contentList.isFetchedAfterMount && contentList.data === null) {
    return (
      <Layout
        pageHeader={{
          breadcrumb: (
            <Content.Nav
              level="content"
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

  // const page: ComponentState = {
  //   // error and loading states are rendered within the DocumentFileList component
  //   empty: <></>,
  //   loading: <AxonLoader />,
  //   error: <></>,
  //   success: (
  //     <Page
  //       panel={panel}
  //       togglePanel={togglePanel}
  //       initialFocusRef={initialFocusRef}
  //       returnFocusRef={returnFocusRef}
  //       ignoreClickRefs={[]}
  //       header={{
  //         breadcrumb: (
  //           <Content.Nav
  //             level="content"
  //             isLoading={contentState.content.contentQuery.isLoading}
  //             contentState={contentState}
  //             contentStateDispatch={contentStateDispatch}
  //             contentId={contentId}
  //             setContentId={setContentId}
  //           />
  //         ),
  //         menus: [
  //           panel.right ? (
  //             <Content.PreviewOptions
  //               contentState={contentState}
  //               contentStateDispatch={contentStateDispatch}
  //               contentId={contentId}
  //               setContentId={setContentId}
  //               togglePanel={togglePanel}
  //             />
  //           ) : null,
  //           <Search.Button type={"icon"} />,
  //           <Settings.Button type="icon" />,
  //           <User.Button type={"icon"} />,
  //         ],
  //       }}
  //       leftPanel={<Page.Left>{<Nav />}</Page.Left>}
  //       rightPanel={
  //         <Page.Right>
  //           <Content.Preview
  //             previewContent={contentState.contentList.previewContent!!}
  //           />
  //         </Page.Right>
  //       }
  //       main={
  //         <Page.Main>
  //           {
  //             <Content.Main>
  //               <Content.View
  //                 contentState={contentState}
  //                 contentStateDispatch={contentStateDispatch}
  //                 contentId={contentId}
  //                 setContentId={setContentId}
  //               />
  //             </Content.Main>
  //           }
  //         </Page.Main>
  //       }
  //       footer={
  //         <Page.Footer>{<Content.Footer {...contentState} />}</Page.Footer>
  //       }
  //     />
  //   ),
  // };

  return (
    <Layout
      pageHeader={{
        breadcrumb: (
          <Content.Nav
            level="content"
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
        content.data && (
          <Page.Main>
            {
              <Content.Main>
                <Content.View content={content} contentList={contentList} />
              </Content.Main>
            }
          </Page.Main>
        )
      }
    />
  );
}

export default ContentPage;
