import { MainPage } from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import Contact from "./pages/Contact";
import ChiSiamo from "./pages/ChiSiamo";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
