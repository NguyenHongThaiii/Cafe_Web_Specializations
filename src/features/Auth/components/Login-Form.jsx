import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputControl from "../../../components/Form-Control/Input-Control";
import PasswordControl from "../../../components/Form-Control/Password-Control";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};
const schema = yup.object({
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
});
function LoginForm({ onSubmit = null }) {
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
      console.log(error);
      setError(error?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="py-[6px]">
        <label htmlFor="email" className="text-base mb-[4px] inline-block">
          Email
        </label>
        <InputControl
          control={control}
          name="email"
          focus
          id="email"
          type="email"
          placeholder="example@gmail.com"
        />
      </div>
      {formState?.errors["email"] && (
        <span className="block font-medium text-sm text-primary transition-all duration-150">
          {formState.errors["email"]?.message}
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
          placeholder="********"
        />
      </div>
      {formState?.errors["password"] && (
        <span className="block font-medium text-sm text-primary transition-all duration-150">
          {formState.errors["password"]?.message}
        </span>
      )}
      {error.length > 0 && (
        <span className="block font-medium text-sm text-primary transition-all duration-150">
          {error}
        </span>
      )}
      <button
        formNoValidate={true}
        className={` w-full my-[14px] p-2 text-[18px] font-medium tracking-[0.4px] border-none outline-none rounded-[4px] text-white ${
          formState.isSubmitting ? "bg-gray-400" : "bg-primary"
        } transition-all`}
        disabled={formState.isSubmitting}
      >
        Đăng nhập
      </button>

      <div className="relative text-center overflow-hidden p-2">
        <div className=" absolute top-[50%] left-0 w-1/2 border-t-[1px] border-t-[#717171] translate-x-[-50%] ml-4 "></div>
        <span className=" text-base px-[6px]">hoặc tiếp túc với</span>
        <div className=" absolute top-[50%] right-0 w-1/2 border-t-[1px] border-t-[#717171] translate-x-[50%] mr-4"></div>
      </div>
    </form>
  );
}

export default LoginForm;
