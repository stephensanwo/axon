import { useTheme } from "@primer/react";
import Blank from "src/components/Blank";
import { ComponentState } from "src/components/Common/ComponentState";
import { Document, DocumentFile } from "src/components/Document";
import DocumentNav from "src/components/Document/Nav";
import Folders from "src/components/Folders";
import AxonLoader from "src/components/Loader/Loader";
import Page from "src/components/Page";
import { useDocumentContext } from "src/context/document/hooks/useDocumentContext";
import { useFolderContext } from "src/hooks/folders/useFolderContext";
import { PiFile } from "react-icons/pi";
import { useRef } from "react";
import { usePage } from "src/context/page/hooks/usePage";
import Search from "src/components/Search";

function DocumentFilePage() {
  const { folders } = useFolderContext();
  const { documentState, documentStateDispatch } = useDocumentContext();
  const { theme } = useTheme();
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
              isLoading={documentState.documentFolderFiles.query.isLoading}
              documentState={documentState}
              documentStateDispatch={documentStateDispatch}
            />
          ),
          menu: (
            <>
              <Search.Button type={"icon"} />
            </>
          ),
        }}
        leftPanel={
          <Page.Left>{<Folders folders={folders} theme={theme} />}</Page.Left>
        }
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
        header={{
          breadcrumb: (
            <DocumentNav
              level="file"
              isLoading={documentState.documentFolderFiles.query.isLoading}
              documentState={documentState}
              documentStateDispatch={documentStateDispatch}
            />
          ),
          menu: (
            <>
              <Search.Button type={"icon"} />
            </>
          ),
        }}
        leftPanel={
          <Page.Left>{<Folders folders={folders} theme={theme} />}</Page.Left>
        }
        rightPanel={
          <Page.Right>{<Document.Preview {...documentState} />}</Page.Right>
        }
        main={
          <Page.Main>
            {documentState.documentFolderFiles.data && (
              <Document.Main>
                <DocumentFile.Header
                  title={`Documents / ${documentState.documentFolderFiles.query.isLoading ? "..." : documentState.documentFolderFiles.folder?.name}`}
                  subtitle="Create, delete and manage documents"
                  documentState={documentState}
                  documentStateDispatch={documentStateDispatch}
                />
                <DocumentFile.List
                  documentState={documentState}
                  documentStateDispatch={documentStateDispatch}
                  isLoading={documentState.documentFolderFiles.query.isLoading}
                  initialSortColumn={
                    documentState.documentFolderFiles.data!!.length > 0
                      ? "created"
                      : ""
                  }
                  initialSortDirection={
                    documentState.documentFolderFiles.data!!.length > 0
                      ? "DESC"
                      : undefined
                  }
                  emptyDocumentMessage={
                    <Document.Empty
                      message={
                        "No files in this folder \n Create a new file to get started"
                      }
                      icon={PiFile}
                    ></Document.Empty>
                  }
                  togglePanel={togglePanel}
                />
              </Document.Main>
            )}
          </Page.Main>
        }
        footer={
          <Page.Footer>{<Document.Footer {...documentState} />}</Page.Footer>
        }
      />
    ),
  };

  if (
    !documentState.documentFolderFiles.query.isFetchedAfterMount &&
    documentState.documentFolderFiles.folder === null
  ) {
    return page["loading"];
  }
  if (
    documentState.documentFolderFiles.query.isFetchedAfterMount &&
    documentState.documentFolderFiles.folder === null
  ) {
    return page["error"];
  }
  return page["success"];
}

export default DocumentFilePage;
