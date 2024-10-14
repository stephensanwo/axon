import Blank from "src/components/Blank";
import { Document, DocumentFile } from "src/components/Document";
import AxonLoader from "src/components/Loader/Loader";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import Icon from "src/components/Common/Icon";
import { useDocument } from "src/context/document/hooks/useDocument";
import Layout from "src/components/Layout";
import { useDocumentFileRoute } from "src/context/document/hooks/useDocumentRoute";
import { DocumentFolderRouteParams } from "src/context/document/document.types";

function DocumentFilePage() {
  const { documentFolders, documentFiles, documentFile } = useDocument();
  const { documentPreviewFileId, clearDocumentFileRouteSearchParams } =
    useDocumentFileRoute();

  if (documentFiles.isLoading) {
    return <AxonLoader />;
  }

  if (documentFiles.isFetchedAfterMount && documentFiles.data === null) {
    return (
      <Layout
        pageHeader={{
          breadcrumb: (
            <Document.Nav
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
        middleTopPanel={
          <Document.Main>
            <Blank
              heading="Folder not found"
              description={`The folder you are looking for does not exist\n or has been deleted.`}
              type="error"
              containerStyles={{
                height: "calc(100vh - 48px)",
                overflow: "none",
              }}
              action={{
                label: "Go to Folders",
                href: "/documents",
              }}
            />
          </Document.Main>
        }
      />
    );
  }

  return (
    <Layout
      pageHeader={{
        breadcrumb: (
          <Document.Nav
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
      middleTopPanel={
        documentFiles.data?.files && (
          <Document.Main>
            <DocumentFile.Header
              title={`Documents / ${documentFiles.isLoading ? "..." : documentFiles.data?.folder?.name}`}
              subtitle="Upload, delete and manage documents"
            />
            <DocumentFile.List
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
            />
          </Document.Main>
        )
      }
      rightPanel={{
        enabled: documentPreviewFileId !== "",
        component: <Document.Preview documentFile={documentFile} />,
        defaultSize: 35,
        minSize: 35,
        maxSize: 35,
        collapsible: true,
        onCollapse: () => {
          clearDocumentFileRouteSearchParams(
            DocumentFolderRouteParams.DOCUMENT_FILE_PREVIEW
          );
        },
      }}
    />
  );
}

export default DocumentFilePage;
