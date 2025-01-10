import { MainPage } from "./pages/MainPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import Contact from "./pages/Contact";
import ChiSiamo from "./pages/ChiSiamo";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route index Component={HomePage} />
          <Route path="/posts">
            <Route index Component={MainPage} />
            <Route path=":id" Component={PostPage}></Route>
          </Route>
          <Route path="/chi-siamo" Component={ChiSiamo} />
          <Route path="/contact" Component={Contact} />
          {/* Se inserisco l'URL /ricette: "http://localhost:5173/ricette" con Navigate reindirizzo alla route /post: "http://localhost:5173/posts" */}
          <Route path="ricette" element={<Navigate to="/posts" />} />
        </Route>
        {/* Rotta per le pagine non trovate: inserendo path="*" */}
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
