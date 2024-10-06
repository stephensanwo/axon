import Blank from "src/components/Blank";
import { ComponentState } from "src/components/Common/ComponentState";
import { Document, DocumentFolder } from "src/components/Document";
import DocumentNav from "src/components/Document/Nav";
import AxonLoader from "src/components/Loader/Loader";
import Page from "src/components/Page";
import { usePage } from "src/context/page/hooks/usePage";
import { useRef } from "react";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import Icon from "src/components/Common/Icon";
import Nav from "src/components/Nav";
import { useDocument } from "src/context/document/hooks/useDocument";

function DocumentFolderPage() {
  const { documentFolders, documentFiles } = useDocument();

  console.log("documentFolders", documentFolders);
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
            <DocumentNav
              level="folder"
              documentFolders={documentFolders}
              documentFiles={documentFiles}
            />
          ),
          menus: [
            <Search.Button type={"icon"} />,
            <Settings.Button type="icon" />,
            <User.Button type={"icon"} />,
          ],
        }}
        leftPanel={<Page.Left>{<Nav />}</Page.Left>}
        rightPanel={
          <Page.Right>
            {/* <Document.Preview {...documentState} /> */}
          </Page.Right>
        }
        main={
          <Page.Main>
            {
              <Document.Main>
                <Blank
                  heading="Unable to load documents"
                  description={`An error occurred while loading documents\n Please try again later.`}
                  type="error"
                  action={{
                    label: "Try again",
                    href: "/documents",
                  }}
                />
              </Document.Main>
            }
          </Page.Main>
        }
        footer={
          <Page.Footer>
            {
              // <Document.Footer {...documentState} />
            }
          </Page.Footer>
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
            <DocumentNav
              level="folder"
              documentFolders={documentFolders}
              documentFiles={documentFiles}
            />
          ),
          menus: [
            <Search.Button type={"icon"} />,
            <Settings.Button type="icon" />,
            <User.Button type={"icon"} />,
          ],
        }}
        leftPanel={<Page.Left>{<Nav />}</Page.Left>}
        rightPanel={<></>}
        main={
          <Page.Main>
            {
              <Document.Main>
                <DocumentFolder.Header
                  title="Documents"
                  subtitle="Manage document folders"
                  documentFolders={documentFolders}
                  documentFiles={documentFiles}
                />
                <DocumentFolder.List
                  initialSortColumn={
                    documentFolders.data?.folders.length!! > 0 ? "created" : ""
                  }
                  initialSortDirection={
                    documentFolders.data?.folders.length!! > 0
                      ? "DESC"
                      : undefined
                  }
                  emptyDocumentMessage={
                    <Document.Empty
                      message={
                        "You have no folders \n Create a new folder to get started"
                      }
                      icon={Icon.DocumentFolder}
                    ></Document.Empty>
                  }
                />
              </Document.Main>
            }
          </Page.Main>
        }
        footer={
          <Page.Footer>
            {
              // <Document.Footer {...documentState} />
            }
          </Page.Footer>
        }
      />
    ),
  };

  if (!documentFolders.isFetchedAfterMount && documentFolders.data === null) {
    return page["loading"];
  }
  if (documentFolders.isFetchedAfterMount && documentFolders.data === null) {
    return page["error"];
  }
  return page["success"];
}

export default DocumentFolderPage;
