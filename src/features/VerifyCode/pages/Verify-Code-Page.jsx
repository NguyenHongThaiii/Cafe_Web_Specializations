import React, { useState } from "react";
import PropTypes from "prop-types";
import VerificationInput from "react-verification-input";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import usersApi from "../../../api/usersApi";
import queryString from "query-string";
import PasswordControl from "../../../components/Form-Control/Password-Control";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styled from "../components//index.module.scss";

const schema = yup.object({
  password: yup
    .string()
    .trim()
    .required("Vui lòng nhập mật khẩu của bạn.")
    .min(6, "Password ít nhất là 6 kí tự."),
  passwordConfirm: yup
    .string()
    .trim()
    .required("Vui lòng xác nhận lại mật khẩu.")
    .oneOf([yup.ref("password")], "Mật khẩu nhập lại không chính xác"),
});
function VerifyCodePage(props) {
  const navigation = useNavigate();
  const location = useLocation();
  const [isDone, setIsDone] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit, setValue, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const handleVerificationChange = (value) => {
    setVerificationCode(value);
  };
  const type = queryString.parse(location.search)?.type;
  const email =
    queryString.parse(location.search)?.email || "example@example.com";
  const handleOnVerification = async () => {
    try {
      setLoading(true);
      if (type === "forgot") {
        await usersApi.validateResetPassword({
          email,
          otp: verificationCode,
        });
        setIsDone(true);
      } else {
        await usersApi.validateRegistration({
          email,
          otp: verificationCode,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleResetPassowrd = async (value) => {
    try {
      await usersApi.handleResetPassword({
        email,
        password: value?.password,
        retypePassword: value?.passwordConfirm,
      });
      navigation("/");
    } catch (error) {
      setError(error?.message);
    }
  };
  return (
    <div className="flex justify-center items-center">
      {!isDone ? (
        <div>
          <h1 className="text-3xl font-medium text-center mb-3">Enter OTP</h1>

          <VerificationInput onChange={handleVerificationChange} />
          <button
            onClick={handleOnVerification}
            disabled={loading}
            className={` w-full my-[14px] p-2 text-[18px] font-medium tracking-[0.4px] border-none outline-none rounded-[4px] text-white ${
              loading ? "bg-gray-400" : "bg-primary"
            } transition-all`}
          >
            Verify OTP
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleResetPassowrd)}>
          <h1 className="text-3xl font-medium text-center mb-3">
            Xác nhận mật khẩu
          </h1>

          <div className="py-[6px]">
            <label
              htmlFor="password"
              className="text-base mb-[4px] inline-block"
            >
              Mật khẩu
            </label>
            <PasswordControl
              control={control}
              name="password"
              id="password"
              setValue={setValue}
              placeholder="123123"
            />
          </div>
          {formState.errors["password"] && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {formState.errors["password"].message}
            </span>
          )}
          <div className="py-[6px]">
            <label
              htmlFor="passwordConfirm"
              className="text-base mb-[4px] inline-block"
            >
              Nhập lại mật khẩu
            </label>
            <PasswordControl
              control={control}
              name="passwordConfirm"
              id="passwordConfirm"
              setValue={setValue}
              placeholder="123123"
            />
          </div>
          {formState.errors["passwordConfirm"] && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {formState.errors["passwordConfirm"].message}
            </span>
          )}
          {error.length > 0 && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {error}
            </span>
          )}
          <button
            formNoValidate={true}
            className={`w-full my-[14px] p-2 text-[18px] font-medium tracking-[0.4px] border-none outline-none rounded-[4px] text-white bg-primary transition-all duration-300  ${styled.buttonHover} `}
          >
            Đặt lại mật khẩu
          </button>
        </form>
      )}
    </div>
  );
}

export default VerifyCodePage;
