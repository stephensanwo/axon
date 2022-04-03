import { Route, BrowserRouter, Routes } from "react-router-dom";
import StyledHeader from "./components/StyledHeader";
import { Home, Folder, Notes, NoteItem } from "./pages";
import "./App.scss";

const App = () => (
  <BrowserRouter>
    <div>
      <StyledHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/:userId" element={<Folder />} />
        <Route exact path="/:userId/:folderId" element={<Notes />} />
        <Route exact path="/:userId/:folderId/:noteId" element={<NoteItem />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
