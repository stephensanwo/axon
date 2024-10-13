import Blank from "src/components/Blank";
import { Document, DocumentFolder } from "src/components/Document";
import AxonLoader from "src/components/Loader/Loader";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import Icon from "src/components/Common/Icon";
import { useDocument } from "src/context/document/hooks/useDocument";
import Layout from "src/components/Layout";

function DocumentFolderPage() {
  const { documentFolders, documentFiles } = useDocument();

  if (documentFiles.isLoading) {
    return <AxonLoader />;
  }

  if (documentFolders.isFetchedAfterMount && documentFolders.data === null) {
    return (
      <Layout
        pageHeader={{
          breadcrumb: (
            <Document.Nav
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
        middleTopPanel={
          <Document.Main>
            <Blank
              heading="Unable to load documents"
              description={`An error occurred while loading documents\n Please try again later.`}
              type="error"
              containerStyles={{
                height: "calc(100vh - 48px)",
                overflow: "none",
              }}
              action={{
                label: "Try again",
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
      middleTopPanel={
        documentFolders.data?.folders && (
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
                documentFolders.data?.folders.length!! > 0 ? "DESC" : undefined
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
        )
      }
    />
  );
}

export default DocumentFolderPage;
