import { Route, Routes } from "react-router-dom";
import { Terms, DownTime, Error, Layout, Privacy } from "src/pages";
import PersistAuth from "src/pages/Auth/PersistAuth";
import RequireAuth from "src/pages/Auth/RequireAuth";
import PublicNotes from "./pages/App/PublicNotes";
import { PublicNoteProvider } from "./context/public";
import { NoteProvider } from "./context/notes";
import { AppProvider } from "./context/app";
import { FolderProvider } from "./context/folder";
import { AuthProvider } from "./context/auth";
import { NodeProvider } from "./context/node";
import { EdgeProvider } from "./context/edge";
import Billing from "./pages/Auth/Billing";
import SignUp from "./pages/Auth/SignUp";
import { ReactFlowProvider } from "reactflow";
import DocumentFolderPage from "./pages/Document/DocumentFolder.page";
import DocumentFilePage from "./pages/Document/DocumentFile.page";
import { DocumentFolderRouteParams } from "./context/document/document.types";
import { SettingsProvider } from "./context/settings";
import { ProjectRouteParams } from "./context/project/project.types";
import ProjectFoldersPage from "./pages/Project/ProjectFolders.page";
import ProjectFilesPage from "./pages/Project/ProjectFiles.page";
import { BoardRouteParams } from "./context/board/board.types";
import BoardPage from "./pages/Board/board.page";
import ContentListPage from "./pages/Content/contentList.page";
import ContentPage from "./pages/Content/content.page";
import { ContentRouteParams } from "./context/content/index.types";
import { WorkerProvider } from "./context/worker";

const Router = () => {
  return (
    <Routes>
      {/* <Route
        path="/shared"
        element={
          <AppProvider>
            <PublicNoteProvider>
              <Layout />
            </PublicNoteProvider>
          </AppProvider>
        }
      >
        <Route path="/shared/note/:public_note_id" element={<PublicNotes />} />
      </Route> */}
      <Route
        path="/"
        element={
          <AuthProvider>
            <SettingsProvider>
              <AppProvider>
                <FolderProvider>
                  {/* React flow provider is added at the note level */}
                  <ReactFlowProvider>
                    <NoteProvider>
                      <NodeProvider>
                        <EdgeProvider>
                          <WorkerProvider>
                            <Layout />
                          </WorkerProvider>
                        </EdgeProvider>
                      </NodeProvider>
                    </NoteProvider>
                  </ReactFlowProvider>
                </FolderProvider>
              </AppProvider>
            </SettingsProvider>
          </AuthProvider>
        }
      >
        {/* <Route element={<PersistAuth />}>
          <Route element={<RequireAuth />}> */}
        <Route path="/projects" element={<ProjectFoldersPage />} />
        <Route
          path={`/projects/:${ProjectRouteParams.PROJECT_NAME}`}
          element={<ProjectFilesPage />}
        />
        <Route
          path={`/projects/:${ProjectRouteParams.PROJECT_NAME}/:${BoardRouteParams.BOARD_NAME}`}
          element={<BoardPage />}
        />
        <Route path="/documents" element={<DocumentFolderPage />} />
        <Route
          path={`/documents/:${DocumentFolderRouteParams.DOCUMENT_FOLDER_NAME}`}
          element={<DocumentFilePage />}
        />
        <Route path="/content" element={<ContentListPage />} />
        <Route
          path={`/content/:${ContentRouteParams.CONTENT_ID_FROM_PATH}`}
          element={<ContentPage />}
        />
      </Route>
      {/* </Route>
      </Route> */}
      <Route
        path="/"
        element={
          <AppProvider>
            <Layout />
          </AppProvider>
        }
      >
        <Route index element={<SignUp />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/unavailable" element={<DownTime />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default Router;
