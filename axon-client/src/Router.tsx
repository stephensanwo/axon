import { Route, Routes } from "react-router-dom";
import { Notes, Terms, DownTime, Error, Layout, Privacy } from "src/pages";
import PersistAuth from "src/pages/Auth/PersistAuth";
import RequireAuth from "src/pages/Auth/RequireAuth";
import PublicNotes from "./pages/Notes/PublicNotes";
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

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppProvider>
            <PublicNoteProvider>
              <Layout />
            </PublicNoteProvider>
          </AppProvider>
        }
      >
        <Route path="/shared/note/:public_note_id" element={<PublicNotes />} />
      </Route>
      <Route
        path="/notes"
        element={
          <AuthProvider>
            <AppProvider>
              <FolderProvider>
                {/* React flow provider is added at the note level */}
                <ReactFlowProvider>
                  <NoteProvider>
                    <NodeProvider>
                      <EdgeProvider>
                        <Layout />
                      </EdgeProvider>
                    </NodeProvider>
                  </NoteProvider>
                </ReactFlowProvider>
              </FolderProvider>
            </AppProvider>
          </AuthProvider>
        }
      >
        <Route element={<PersistAuth />}>
          <Route element={<RequireAuth />}>
            <Route index element={<Notes />} />
          </Route>
        </Route>
      </Route>
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
