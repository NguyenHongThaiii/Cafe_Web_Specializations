import { unwrapResult } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { CgCloseO } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { login, signup } from "../authSlice";
import LoginForm from "../components/Login-Form";
import RegisterForm from "./../components/Register-Form";

LoginPage.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function LoginPage({ onClick }) {
  if (typeof document === "undefined") return <div>Login Page</div>;
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const handleOnSubmit = async (value) => {
    if (isLogin) {
      const action = login(value);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
    } else {
      const action = signup(value);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
    }
  };

  const handleClick = () => {
    setIsLogin((prev) => !prev);
    // setIsLogin(false);
  };
  return createPortal(
    <div className="fixed inset-0 w-[100vw] h-[100vh] z-[10000] flex items-center justify-center bg-[rgba(0,0,0,.65)] ">
      <div className="relative overflow-hidden flex  rounded-[10px] bg-white w-full h-full lg:h-auto lg:w-auto">
        <CgCloseO
          onClick={onClick}
          className="absolute top-0 lg:right-0 right-[16px]  text-[26px] m-[6px] text-[#717171] cursor-pointer hover:scale-125 hover:text-black transition-all duration-300"
        />
        {/* left */}
        <div className="lg:w-[400px] p-6 lg:h-[600px] w-full h-full ">
          <h2 className="mb-[10px] text-[21px] font-medium">
            {isLogin ? "  Đăng nhập tài khoản" : "Tạo tài khoản"}
          </h2>
          {isLogin ? (
            <LoginForm onSubmit={handleOnSubmit} />
          ) : (
            <RegisterForm onSubmit={handleOnSubmit} />
          )}

          {isLogin && (
            <div className="text-base text-center pt-5 text-primary font-bold cursor-pointer hover:underline transition-all duration-300">
              Quên mật khẩu?
            </div>
          )}

          <div className="texxt-base pt-[10px] text-center">
            {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản"}
            <span
              onClick={handleClick}
              className="text-primary font-bold ml-1 cursor-pointer hover:underline transition-all duration-300"
            >
              {isLogin ? " Tạo tài khoản" : "Đăng nhập"}
            </span>
          </div>
        </div>

        {/* right */}
        <div className="w-[400px] bg-[#fdebef] hidden lg:block">
          <img
            src="/img/login-image.svg"
            alt="login-image"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
}

export default LoginPage;
