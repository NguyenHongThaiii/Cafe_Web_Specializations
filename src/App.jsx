import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useHide } from "./context/Global-Provider";
import VerifyCodePage from "./features/VerifyCode/pages/Verify-Code-Page";
import SearchPage from "./features/SearchPage/pages/Search-Page";
import PlacePage from "./features/Place/pages/Place-Page";
import BlogSavedPage from "./features/BlogSaved/pages/Blog-Saved-Page";
import CreateBlog from "./features/CreateBlog/pages/Create-Blog";
import HomePage from "./features/Home/pages/Home-Page";
import ProfilePage from "./features/Profile/pages/Profile-Page";
import PhotoPage from "./features/Place/pages/Photo-Page";
import ExplorePage from "./features/Explore/pages/Explore-Page";
import SettingPage from "./features/Setting/pages/Setting-Page";
import NotFoundPage from "./features/NotFound/Not-Found-Page";
import EditBlogPage from "./features/EditBlog/pages/Edit-Blog-Page";

// const HomePage = lazy(() => import("./features/Home/pages/Home-Page"));

function App() {
  const [hide, setHide] = useHide();
  useEffect(() => {
    // if (hide) {
    //   document.getElementById("root").style.maxHeight = "100vh";
    //   document.getElementById("root").style.overflow = "hidden";
    // } else {
    //   document.getElementById("root").style.maxHeight = "fit-content";
    //   document.getElementById("root").style.overflow = "unset";
    // }
  }, [hide]);
  document.getElementById("root").style.overflow = "unset";

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/verify" element={<VerifyCodePage />} />
      <Route path="/add-place" element={<CreateBlog />} />
      <Route path="/edit-place/:name" element={<EditBlogPage />} />
      <Route path="/saved" element={<BlogSavedPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/setting" element={<SettingPage />} />
      {/* <Route path="/not-found" element={<NotFoundPage />} /> */}
      <Route path="/place/:name" element={<PlacePage />}></Route>
      <Route path="/profile/:name" element={<ProfilePage />} />
      <Route path="/place/:name/photo" element={<PhotoPage />}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
