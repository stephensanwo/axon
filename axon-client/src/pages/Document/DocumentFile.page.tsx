import Blank from "src/components/Blank";
import { ComponentState } from "src/components/Common/ComponentState";
import { Document, DocumentFile } from "src/components/Document";
import DocumentNav from "src/components/Document/Nav";
import AxonLoader from "src/components/Loader/Loader";
import Page from "src/components/Page";
import { useRef } from "react";
import { usePage } from "src/context/page/hooks/usePage";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import Icon from "src/components/Common/Icon";
import Nav from "src/components/Nav";
import { useDocument } from "src/context/document/hooks/useDocument";

function DocumentFilePage() {
  const { documentFolders, documentFiles } = useDocument();
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
              level="file"
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
                <Blank
                  heading="Folder not found"
                  description={`The folder you are looking for does not exist\n or has been deleted.`}
                  type="error"
                  action={{
                    label: "Go to Folders",
                    href: "/documents",
                  }}
                />
              </Document.Main>
            }
          </Page.Main>
        }
        footer={<Page.Footer></Page.Footer>}
      />
    ),
    success: (
      <Page
        panel={panel}
        togglePanel={togglePanel}
        initialFocusRef={initialFocusRef}
        returnFocusRef={returnFocusRef}
        ignoreClickRefs={[]}
        closeOnClickOutside={true}
        header={{
          breadcrumb: (
            <DocumentNav
              level="file"
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
        rightPanel={<Page.Right>{<Document.Preview />}</Page.Right>}
        main={
          <Page.Main>
            {documentFiles.data?.files && (
              <Document.Main>
                <DocumentFile.Header
                  title={`Documents / ${documentFiles.isLoading ? "..." : documentFiles.data?.folder?.name}`}
                  subtitle="Create, delete and manage documents"
                />
                <DocumentFile.List
                  isLoading={documentFiles.isLoading}
                  initialSortColumn={
                    documentFiles.data?.files!!.length > 0 ? "created" : ""
                  }
                  initialSortDirection={
                    documentFiles.data?.files!!.length > 0 ? "DESC" : undefined
                  }
                  emptyDocumentMessage={
                    <Document.Empty
                      message={
                        "No files in this folder \n Create a new file to get started"
                      }
                      icon={Icon.DocumentFile}
                    ></Document.Empty>
                  }
                  togglePanel={togglePanel}
                />
              </Document.Main>
            )}
          </Page.Main>
        }
        footer={
          <Page.Footer>
            {
              <Document.Footer
                documentFolders={documentFolders}
                documentFiles={documentFiles}
              />
            }
          </Page.Footer>
        }
      />
    ),
  };

  if (
    !documentFiles.isFetchedAfterMount &&
    documentFiles.data?.folder === null
  ) {
    return page["loading"];
  }
  if (
    documentFiles.isFetchedAfterMount &&
    documentFiles.data?.folder === null
  ) {
    return page["error"];
  }
  return page["success"];
}

export default DocumentFilePage;
