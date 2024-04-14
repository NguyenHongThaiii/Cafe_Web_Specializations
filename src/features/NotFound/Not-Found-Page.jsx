import React from "react";
import PropTypes from "prop-types";
import LayoutUser from "../../components/Layout/Layout-User";
import { Link } from "react-router-dom";

NotFoundPage.propTypes = {};

function NotFoundPage(props) {
  return (
    <LayoutUser>
      <div className="flex items-center justify-center p-10">
        <div className="flex flex-col items-center">
          <img src="/img/404.svg" alt="" />
          <p className="lg:text-[28px] text-[22px] font-medium">
            404 - Trang không tồn tại
          </p>
          <Link
            to="/"
            onClick={null}
            className="px-[14px] bg-primary hover:bg-[#be0129] transition-all text-white h-10 flex items-center justify-center rounded-md mt-2  "
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </LayoutUser>
  );
}

export default NotFoundPage;
