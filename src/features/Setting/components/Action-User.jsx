import React from "react";
import { FaCoins, FaUserEdit } from "react-icons/fa";
import { MdMailOutline, MdPowerSettingsNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import usersApi from "../../../api/usersApi";
import { logout } from "../../Auth/authSlice";
ActionUser.propTypes = {};

function ActionUser(props) {
  const user = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  return (
    <>
      <div className="flex gap-6  border-b-2 pb-3">
        <div className="rounded-full overflow-hidden">
          <img
            src={user?.image?.url}
            alt={user?.name}
            className="w-[60px] h-[60px]"
          />
        </div>
        <div>
          <p className="text-lg font-bold">{user?.name}</p>
          <p className="text[16px] text-[#474747] font-medium">User</p>
        </div>
      </div>
      <div className="pt-2">
        <Link
          to="/setting"
          className="flex items-center gap-x-[6px] py-2 px-[14px]    bg-[#f6f6f6] text-primary transition-all duration-150"
        >
          <FaUserEdit className="w-[28px] text-base" />
          <p className=" text-base  font-semibold overflow-ellipsis whitespace-normal overflow-hidden ">
            Chỉnh sửa hồ sơ
          </p>
        </Link>
        {/* <Link
          to="/"
          className="flex items-center gap-x-[6px] py-2 px-[14px]   text-black hover:bg-[#f6f6f6] hover:text-primary transition-all duration-150"
        >
          <FaCoins className="w-[28px] text-base" />
          <p className=" text-base  font-semibold overflow-ellipsis whitespace-normal overflow-hidden ">
            Điểm thưởng
          </p>
        </Link> */}
        <Link
          to="/"
          className="flex items-center gap-x-[6px] py-2 px-[14px]  border-b-[1px] text-black hover:bg-[#f6f6f6] hover:text-primary transition-all duration-150"
        >
          <MdMailOutline className="w-[28px] text-base" />
          <p className=" text-base  font-semibold overflow-ellipsis whitespace-normal overflow-hidden ">
            Liên hệ - góp ý
          </p>
        </Link>
        <div
          onClick={handleLogout}
          className="flex items-center gap-x-[6px] py-2 px-[14px] cursor-pointer   text-black hover:bg-[#f6f6f6] hover:text-primary transition-all duration-150"
        >
          <MdPowerSettingsNew className="w-[28px] text-base" />
          <p className=" text-base  font-semibold overflow-ellipsis whitespace-normal overflow-hidden ">
            Đăng xuất
          </p>
        </div>
      </div>
    </>
  );
}

export default ActionUser;
