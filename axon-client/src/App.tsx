import { Route, Routes } from "react-router-dom";
import StyledHeader from "src/components/StyledHeader";
import { NoteItem, Terms } from "src/pages";
import "src/App.scss";
import { SignUp } from "src/pages/Auth";
import { Fragment, useContext } from "react";
import Layout from "src/pages/Layout";
import Error from "src/pages/Error";
import PersistAuth from "src/pages/Auth/PersistAuth";
import RequireAuth from "src/pages/Auth/RequireAuth";

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
