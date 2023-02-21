import { Route, Routes } from "react-router-dom";
import StyledHeader from "./components/StyledHeader";
import { NoteItem, Terms } from "./pages";
import "./App.scss";
import { SignUp } from "./pages/Auth";
import { Fragment, useContext } from "react";
import Layout from "./pages/Layout";
import Error from "./pages/Error";
import PersistAuth from "./pages/Auth/PersistAuth";
import RequireAuth from "./pages/Auth/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SignUp />} />
        <Route path="/terms" element={<Terms />} />
        <Route element={<PersistAuth />}>
          <Route element={<RequireAuth />}>
            <Route exact path="/notes" element={<NoteItem />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
