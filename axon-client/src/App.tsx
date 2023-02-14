import { Route, Routes } from "react-router-dom";
import StyledHeader from "./components/StyledHeader";
import { Home, NoteItem, Terms } from "./pages";
import "./App.scss";
import SignUp from "./pages/Auth/SignUp";
import { Fragment } from "react";
import Layout from "./components/Layout";
import Error from "./pages/Error";
import RequireAuth from "./components/RequireAuth";

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route path="/terms" element={<Terms />} />
      <Route exact path="/" element={<SignUp />} />
      {/* Protected Routes */}
      {/* element={<RequireAuth />} */}

      <Route
        exact
        path="/:userId/folders/:folderId/:noteId"
        element={<NoteItem />}
      />
      {/* Catch All */}
      <Route path="*" element={<Error />} />
    </Route>
  </Routes>
);

export default App;
