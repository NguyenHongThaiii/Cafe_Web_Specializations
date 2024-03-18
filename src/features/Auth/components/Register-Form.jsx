import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputControl from "../../../components/Form-Control/Input-Control";
import PasswordControl from "../../../components/Form-Control/Password-Control";
import styled from "./index.module.scss";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Vui lòng điền tên của bạn.")
    .min(3, "Tên người dùng ít nhất là 6 kí tự."),
  email: yup
    .string("Vui lòng nhập email của bạn.")
    .trim()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email của bạn"),
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

function RegisterForm({ onSubmit = null }) {
  const [error, setError] = useState("");

  const { control, handleSubmit, setValue, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const handleOnSubmit = async (value) => {
    if (!onSubmit) return null;
    try {
      await onSubmit(value);
    } catch (error) {
      setError(error?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="py-[6px]">
        <label htmlFor="email" className="text-base mb-[4px] inline-block">
          Tên hiển thị
        </label>
        <InputControl
          control={control}
          name="name"
          focus
          id="name"
          type="text"
          placeholder="123123"
        />
      </div>
      {formState.errors["name"] && (
        <span className="block font-medium text-sm text-primary transition-all duration-150">
          {formState.errors["name"].message}
        </span>
      )}

      <div className="py-[6px]">
        <label htmlFor="email" className="text-base mb-[4px] inline-block">
          Email
        </label>
        <InputControl
          control={control}
          name="email"
          id="email"
          type="email"
          placeholder="example@gmail.com"
        />
      </div>
      {formState.errors["email"] && (
        <span className="block font-medium text-sm text-primary transition-all duration-150">
          {formState.errors["email"].message}
        </span>
      )}

      <div className="py-[6px]">
        <label htmlFor="password" className="text-base mb-[4px] inline-block">
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
        Tạo tài khoản
      </button>

      <div className="relative text-center overflow-hidden p-2">
        <div className=" absolute top-[50%] left-0 w-1/2 border-t-[1px] border-t-[#717171] translate-x-[-50%] ml-4 "></div>
        <span className=" text-base px-[6px]">hoặc tiếp túc với</span>
        <div className=" absolute top-[50%] right-0 w-1/2 border-t-[1px] border-t-[#717171] translate-x-[50%] mr-4"></div>
      </div>
    </form>
  );
}

export default RegisterForm;
