import { Route, Routes } from "react-router-dom";
import { NoteItem, Terms } from "src/pages";
import "src/App.scss";
import { SignUp } from "src/pages/Auth";
import Layout from "src/pages/Layout";
import Error from "src/pages/Error";
import Privacy from "src/pages/Privacy";
import DownTime from "src/pages/DownTime";
import PersistAuth from "src/pages/Auth/PersistAuth";
import RequireAuth from "src/pages/Auth/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SignUp />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route element={<PersistAuth />}>
          <Route element={<RequireAuth />}>
            <Route exact path="/notes" element={<NoteItem />} />
          </Route>
        </Route>
        <Route path="/unavailable" element={<DownTime />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
