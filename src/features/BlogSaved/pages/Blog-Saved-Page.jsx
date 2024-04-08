import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BlogSavedContent from "../components/Blog-Saved-Content";
import LayoutUser from "../../../components/Layout/Layout-User";

BlogSavedPage.propTypes = {};

function BlogSavedPage(props) {
  const user = useSelector((state) => state.auth.current);
  if (!user?.name) return <Navigate to="/" />;
  return (
    <LayoutUser>
      <div>
        <div className="hidden lg:block bg-[linear-gradient(180deg,#ffb8b8,#fbfbfb)] bg-[-webkit-linear-gradient(top,#ffb8b8,#fbfbfb)] h-[222px] mb-6">
          <div className="flex justify-between items-center max-w-[1200px] mx-auto px-4">
            <div className="text-[#1d2129] w-[70%] mr-20">
              <h1 className="text-[#1d2129] mb-4 text-[32px] font-semibold">
                Danh sách đã lưu
              </h1>
              <p className="text-[20px] font-medium">
                Lập danh sách những quán cafe yêu thích để dễ dàng so sánh và
                theo dõi!
              </p>
              <p className="text-[20px] font-medium">
                Chúng tôi sẽ giúp bạn luôn theo dấu những địa điểm này.
              </p>
            </div>
            <div className="w-[30%] p-[30px] text-right">
              <img
                src="/img/logo_blog_save.svg"
                alt="logo_blog_save"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <BlogSavedContent />
      </div>
    </LayoutUser>
  );
}

export default BlogSavedPage;
