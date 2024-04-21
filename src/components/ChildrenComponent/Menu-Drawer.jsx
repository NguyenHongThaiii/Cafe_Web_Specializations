import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { MdOutlineSave } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import usersApi from "../../api/usersApi";
import { logout } from "../../features/Auth/authSlice";
const MENU_LIST = [
  {
    title: "Tôi Đi Cafe",
    elementList: [
      {
        pathname: "/",
        element: (
          <>
            <i className={`fa-solid fa-house-chimney text-[18px]  pr-3 `}></i>
            <span className="text-[16px] capitalize  font-medium">
              Trang chủ
            </span>
          </>
        ),
      },
      {
        pathname: "/explore",
        element: (
          <>
            <i className="fa-solid fa-fire-flame-curved  text-[18px]  pr-3"></i>
            <span className="text-[16px] capitalize  font-medium">
              Khám phá
            </span>
          </>
        ),
      },
      {
        pathname: "",
        element: (
          <>
            <i className="fa-solid fa-certificate text-[18px]  pr-3"></i>
            <span className="text-[16px] capitalize  font-medium">
              Khuyến mãi
            </span>
          </>
        ),
      },
      {
        pathname: "",
        element: (
          <>
            <i className="fa-solid fa-location-dot text-[18px]  pr-3"></i>
            <span className="text-[16px] capitalize  font-medium">
              Địa điểm mới
            </span>
          </>
        ),
      },
    ],
  },
  {
    title: "Thông Tin",
    elementList: [
      {
        pathname: "",
        element: (
          <>
            <i className="fa-solid fa-circle-info text-[18px]  pr-3"></i>
            <span className="text-[16px] capitalize  font-medium">
              Giới thiệu
            </span>
          </>
        ),
      },
      {
        pathname: "",
        element: (
          <>
            <i className="fa-solid fa-user-shield text-[18px]  pr-3"></i>
            <span className="text-[16px] capitalize  font-medium">
              Điều khoản & Chính sách
            </span>
          </>
        ),
      },
      {
        pathname: "",
        element: (
          <>
            <i className="fa-solid fa-envelope text-[18px]  pr-3"></i>
            <span className="text-[16px] capitalize  font-medium">
              Liên hệ - Góp ý
            </span>
          </>
        ),
      },
    ],
  },
  {
    title: "Theo dõi chúng tôi",
    elementList: [
      {
        pathname: "",
        element: (
          <>
            <i className="fa-brands fa-facebook-f facebook text-[18px]  pr-3"></i>
            <span className="facebook text-[16px] capitalize  font-medium">
              Facebook
            </span>
          </>
        ),
      },
      {
        pathname: "",
        element: (
          <>
            <i className="fa-brands fa-instagram instagram text-[18px]  pr-3"></i>{" "}
            <span className="instagram text-[16px] capitalize  font-medium ml-[-6px]">
              Instagram
            </span>
          </>
        ),
      },
      {
        pathname: "",
        element: (
          <>
            <i className="fa-brands fa-tiktok tiktok text-[18px]  pr-3"></i>
            <span className="tiktok text-[16px] capitalize  font-medium">
              Tiktok
            </span>
          </>
        ),
      },
    ],
  },
];

MenuDrawer.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func,
  onShow: PropTypes.func,
};

function MenuDrawer({ show, onClick = null, onShow = null }) {
  if (typeof document === "undefined")
    return <div className="modal">Modal</div>;
  const user = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (!onClick || !onShow) return null;
    onClick();
    onShow();
  };
  const handleLogout = async () => {
    try {
      await usersApi.logout();
      const action = logout();
      dispatch(action);
      navigate("/");
    } catch (error) {
      console.log("Error", error);
    }
  };
  return createPortal(
    <div
      className={`lg:hidden fixed inset-0 z-[10000] ${
        show ? " visible" : " invisible"
      } transition-all duration-500 `}
    >
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,.45)] cursor-pointer"
        onClick={onClick}
      ></div>

      <div
        className={` overflow-y-scroll absolute inset-y-0 right-0 z-10 bg-white  w-[280px]  transition-all duration-500 ${
          show ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        {!user ? (
          <div className="p-5 pb-4">
            <button
              onClick={handleOnClick}
              className="bg-primary rounded-[6px] text-base font-medium text-white px-4 w-full h-[40px] leading-10 hover:bg-[#be0129] transition-all duration-300"
            >
              Đăng nhập / Đăng ký
            </button>
          </div>
        ) : (
          <div>
            <Link
              to={`/profile/${user?.slug}`}
              className="flex gap-x-4 w-full px-5 pt-5 pb-4 bg-[linear-gradient(270deg,#ef5d7c,#e03)]  rounded-br-[60px] "
            >
              <img
                src={user?.image?.url}
                alt={user.photo}
                className="w-[60px] h-[60px] object-cover rounded-full "
              />
              <div>
                <p className="text-lg font-bold text-white mb-1 truncate-text">
                  {user.name}
                </p>
                <img
                  src="/img/ranked.png"
                  alt="ranked"
                  className="w-[44px] object-cover"
                />
              </div>
            </Link>

            <Link
              to="/setting"
              className="animation-origin block py-[10px] px-5"
            >
              <i className={`fa-solid fa-house-chimney text-[18px]  pr-3 `}></i>
              <span className="text-[16px] capitalize  font-medium">
                Chỉnh sửa hồ sơ
              </span>
            </Link>
            <Link
              to="/saved"
              className="animation-origin flex items-center gap-x-3 py-[10px] px-5"
            >
              <MdOutlineSave className="text-[20px] object-cover" />
              <span className="text-[16px] capitalize  font-medium">
                Danh sách đã lưu
              </span>
            </Link>
          </div>
        )}

        <div className="mt-[10px]">
          {MENU_LIST.map((item, index) => (
            <React.Fragment key={index}>
              <h3 className="capitalize mt-[10px] mb-1 py-[6px] px-5 bg-[#f0f2f5] text-sm font-medium">
                {item.title}
              </h3>
              {item.elementList.map((element, indx) => (
                <Link
                  to={element?.pathname}
                  key={indx}
                  className="animation-origin block py-[10px] px-5"
                >
                  {element.element}
                </Link>
              ))}
            </React.Fragment>
          ))}
        </div>
        {user && (
          <div className="py-[10px] px-5 flex items-center justify-center">
            <button
              onClick={handleLogout}
              className="text-base font-normal text-primary rounded-[4px] outline-none border-primary border-[1px] w-full p-1 hover:bg-primary hover:text-white transition-all duration-300"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>,
    document.querySelector("body")
  );
}

export default MenuDrawer;
