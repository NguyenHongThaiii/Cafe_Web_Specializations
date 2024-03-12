import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
const NAV_LIST = [
  {
    pathname: "",
    element: (
      <>
        <i className={`fa-solid fa-house-chimney   text-[20px] pt-[10px] `}></i>
        <span className="block text-[10px] capitalize mt-[2px]  font-medium">
          Trang chủ
        </span>
      </>
    ),
  },
  {
    pathname: "explore",
    element: (
      <>
        <i className="fa-solid fa-fire-flame-curved  text-[20px] pt-[10px]"></i>
        <span className="block text-[10px] capitalize mt-[2px]  font-medium">
          Khám phá
        </span>
      </>
    ),
  },
  {
    pathname: "discount",
    element: (
      <>
        <i className="fa-solid fa-certificate  text-[20px] pt-[10px]"></i>
        <span className="block text-[10px] capitalize mt-[2px]  font-medium">
          Khuyến mãi
        </span>
      </>
    ),
  },
  {
    pathname: "saved",
    element: (
      <>
        <i className="fa-solid fa-bookmark  text-[20px] pt-[10px]"></i>
        <span className="block text-[10px] capitalize mt-[2px]  font-medium">
          Đã lưu
        </span>
      </>
    ),
  },
  {
    pathname: "account",
    element: (
      <>
        <i className="fa-solid fa-user-astronaut  text-[20px] pt-[10px]"></i>
        <span className="block text-[10px] capitalize mt-[2px]  font-medium">
          Tài khoản
        </span>
      </>
    ),
  },
];

function Nav() {
  const radioRef = useRef(null);
  const handleOnClick = () => {};
  return (
    <nav className="fixed inset-x-0 bottom-0 h-[60px] bg-white border-t border-[#ddd] z-[1000] block lg:hidden">
      <div className="max-w-[400px]  min-h-[60px] mx-auto grid grid-cols-5">
        {NAV_LIST.map((item, index) => (
          <React.Fragment key={index}>
            {
              <NavLink
                to={item.pathname}
                href="#"
                className="h-full block text-center "
                style={({ isActive }) => {
                  return {
                    color: isActive && "#e03",
                  };
                }}
              >
                {item.element}
              </NavLink>
            }
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}

export default Nav;
