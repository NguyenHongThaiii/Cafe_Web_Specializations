import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

NavMenu.propTypes = {};

function NavMenu({}) {
  const [submenu, setSubmenu] = useState(false);
  const handleSubmenu = (e) => {
    setSubmenu((prev) => !prev);
  };
  return (
    <div
      onClick={handleSubmenu}
      className={` xl:hidden w-[40px] h-[40px] flex items-center justify-center bg-[#f0f2f5] rounded-full cursor-pointer relative`}
    >
      <img src="/img/wrap-icon.svg" alt="wrap-icon" className=" w-1/2 h-1/2" />

      {submenu && (
        <div className="absolute z-[100] top-full left-0 w-[180px] bg-white rounded-[6px] shadow-2xl">
          <Link
            to="/"
            className="px-4 py-2 block hover:text-primary hover:bg-[#f6f6f6] transition-all duration-300"
          >
            <i className="fa-regular fa-hashtag "></i>
            <span className="ml-1 text-[18px] font-medium  ">Khám phá</span>
          </Link>
          <Link
            to="/"
            className="px-4 py-2 block hover:text-primary hover:bg-[#f6f6f6] transition-all duration-300"
          >
            <i className="fa-solid fa-certificate"></i>
            <span className="ml-1 text-[18px] font-medium  ">Khuyến mãi</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavMenu;
