import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useHide } from "../../context/Global-Provider";
import SearchModal from "./../../features/Home/components/Search-Modal";
import HeaderUser from "../ChildrenComponent/Header-User";
import NavMenu from "../ChildrenComponent/Nav-Menu";
import NavMobile from "../ChildrenComponent/Nav-Mobile";
import MenuDrawer from "../ChildrenComponent/Menu-Drawer";

function Header() {
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);
  const [hide, setHide] = useHide();

  const isShowLoginPage = useSelector((state) => state.auth.isShowLoginPage);
  const user = useSelector((state) => state.auth.current);
  console.log("user", user);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    return () => {
      setHide(false);
      // handleHideLoginPage();
    };
  }, []);
  const handleClick = () => {
    setShow((prev) => !prev);
    setHide((prev) => !prev);
  };
  const handleFocus = (e) => {
    setFocus((prev) => !prev);
    e.stopPropagation();
  };

  const handleShowLoginPage = (e) => {
    // const action = showLoginPage();
    // dispatch(action);
  };
  const handleHideLoginPage = (e) => {
    // const action = hideLoginPage();
    // dispatch(action);
  };
  return (
    <header className="flex items-center justify-between h-[54px] px-[6px] pb-[2px] lg:px-10 lg:pb-0  lg:h-[60px] shadow-lg">
      <div className="flex items-center gap-x-6 ">
        <Link to="/" className=" h-[44px]  lg:h-[60px] ">
          <img src="/img/logo.svg" alt="" className="w-full h-full" />
        </Link>
        {location.pathname !== "/" && (
          <div
            onClick={() => setFocus(true)}
            className={`hidden lg:flex items-center relative ${
              focus ? "  w-[500px]" : "w-[300px]"
            }  h-[40px] px-[14px] mr-[14px] rounded-full bg-[#f0f2f5] transition-all duration-300 `}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Tìm kiếm quán cafe"
              className="cursor-text outline-none border-none w-full h-full text-[#606770] font-normal px-[2px] py-[1px] ml-[6px] text-base leading-[28px]"
            />
            <SearchModal show={focus} onShow={handleFocus} />
          </div>
        )}
        <NavMenu />
        {focus || (
          <>
            <div className="py-[10px] text-[18px] mr-3 hidden xl:block lg:hover:text-primary transition-all duration-300 cursor-pointer ">
              <i className="fa-regular fa-hashtag "></i>
              <span className=" ml-1 font-medium ">Khám phá</span>
            </div>
            <div className="py-[10px] text-[18px] hidden xl:block lg:hover:text-primary transition-all duration-300 cursor-pointer">
              <i className="fa-solid fa-certificate"></i>
              <span className=" ml-1 font-medium">Khuyến mãi</span>
            </div>
          </>
        )}
      </div>

      <div className=" gap-x-[14px] hidden lg:flex">
        <button
          className="rounded-full bg-primary text-white
        h-10 text-[16px] leading-[30px] font-semibold px-[14px] lg:hover:bg-[#be0129] transition-all duration-300 whitespace-nowrap
        "
        >
          <i className="fa-solid fa-pencil mr-[6px]"></i>
          Viết Review
        </button>
        {!user ? (
          <button
            onClick={handleShowLoginPage}
            className="rounded-full text-primary
        h-10 text-[16px] leading-[30px] font-semibold px-[14px] border border-primary lg:hover:bg-[#be0129] lg:hover:text-white transition-all duration-300"
          >
            Đăng nhập
          </button>
        ) : (
          <HeaderUser user={user} />
        )}
      </div>
      <NavMobile onClick={handleClick} />
      <MenuDrawer
        show={show}
        onClick={handleClick}
        onShow={handleShowLoginPage}
      />
      {isShowLoginPage && <LoginPage onClick={handleHideLoginPage} />}
    </header>
  );
}

export default Header;
