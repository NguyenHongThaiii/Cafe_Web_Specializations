import PropTypes from "prop-types";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import SearchModalMobile from "../../features/Home/components/Search-Modal-Mobile";

NavMobile.propTypes = {
  onClick: PropTypes.func,
};

function NavMobile({ onClick = null }) {
  const [show, setShow] = useState(false);

  const location = useLocation();

  return (
    <div className="gap-x-4 flex lg:hidden">
      {location.pathname !== "/search" ? (
        <div className="relative bg-[#f0f2f5] text-primary w-10 h-10 rounded-full flex items-center justify-center">
          <Link to="" className="z-10 relative">
            <i className="fa-solid fa-location-dot text-[20px]"></i>
          </Link>
          <div className="absolute inset-0 flex items-center justify-center ">
            <div className="w-[20px] h-[20px] bg-primary rounded-full animate-ping"></div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            setShow(true);
          }}
          className="relative bg-[#f0f2f5] text-primary w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
        >
          <div className="z-10 relative w-full flex items-center justify-center">
            <MdSearch className="m-0 text-[26px]" />
          </div>
        </div>
      )}
      <div
        className="bg-[#f0f2f5] w-10 h-10 rounded-full flex items-center justify-center  cursor-pointer"
        onClick={onClick}
      >
        <span>
          <svg
            viewBox="0 0 120 100"
            width="20"
            height="18"
            className="fill-primary"
          >
            <rect width="120" height="18" rx="14"></rect>
            <rect y="40" x="30" width="90" height="20" rx="14"></rect>
            <rect y="80" width="120" height="20" rx="14"></rect>
          </svg>
        </span>
      </div>
      <SearchModalMobile show={show} onShow={() => setShow(false)} />
    </div>
  );
}

export default NavMobile;
