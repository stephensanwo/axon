import { Route, BrowserRouter, Routes } from "react-router-dom";
import StyledHeader from "./components/StyledHeader";
import { Home, Folder, Notes, NoteItem } from "./pages";
import "./App.scss";

const App = () => (
  <BrowserRouter>
    <StyledHeader />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/folders/:userId" element={<Folder />} />
      <Route exact path="/folders/:userId/:folderId" element={<Notes />} />
      <Route
        exact
        path="/folders/:userId/:folderId/:noteId"
        element={<NoteItem />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;
