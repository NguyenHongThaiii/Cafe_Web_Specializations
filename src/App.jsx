import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useHide } from "./context/Global-Provider";
import VerifyCodePage from "./features/VerifyCode/pages/Verify-Code-Page";
import SearchPage from "./features/SearchPage/pages/Search-Page";
import PlacePage from "./features/Place/pages/Place-Page";
import BlogSavedPage from "./features/BlogSaved/pages/Blog-Saved-Page";

const HomePage = lazy(() => import("./features/Home/pages/Home-Page"));

function App() {
  const [hide, setHide] = useHide();
  useEffect(() => {
    if (hide) {
      document.getElementById("root").style.maxHeight = "100vh";
      document.getElementById("root").style.overflow = "hidden";
    } else {
      document.getElementById("root").style.maxHeight = "fit-content";
      document.getElementById("root").style.overflow = "unset";
    }
  }, [hide]);
  document.getElementById("root").style.overflow = "unset";

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/verify" element={<VerifyCodePage />} />
      <Route path="/saved" element={<BlogSavedPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/place/:name" element={<PlacePage />}></Route>
    </Routes>
  );
}

export default App;
