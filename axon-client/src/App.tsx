import { Route, Routes } from "react-router-dom";
import { Notes, Terms, DownTime, Error, Layout, Privacy } from "src/pages";
import "src/App.scss";
import { SignUp } from "src/pages/Auth";
import PersistAuth from "src/pages/Auth/PersistAuth";
import RequireAuth from "src/pages/Auth/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SignUp />} />
        <Route element={<PersistAuth />}>
          <Route element={<RequireAuth />}>
            <Route exact path="/notes" element={<Notes />} />
          </Route>
        </Route>
        <Route path="/unavailable" element={<DownTime />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
