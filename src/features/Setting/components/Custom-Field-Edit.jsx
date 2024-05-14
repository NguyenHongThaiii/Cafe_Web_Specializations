import React, { Children, useState } from "react";
import PropTypes from "prop-types";
import InputControlCommon from "../../../components/Form-Control/Input-Control-Common";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import usersApi from "../../../api/usersApi";
import { useDispatch } from "react-redux";
import { updateUserNotImage } from "../../Auth/authSlice";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
CustomFieldEdit.propTypes = {
  name: PropTypes.string,
  user: PropTypes.object,
  errorMessage: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  isChange: PropTypes.bool,
  type: PropTypes.string,
};

function CustomFieldEdit({
  name = "",
  user = {},
  errorMessage = "",
  title = "",
  content = "",
  isChange = true,
  type = "default",
  children,
}) {
  const { control, handleSubmit, setValue, formState, reset } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleUpdateUser = async (userData) => {
    if (!userData[name] || userData[name].trim().length === 0) {
      setError(errorMessage);
      return;
    }
    if (
      !userData[name] ||
      userData[name].trim().length > 20 ||
      !userData[name] ||
      userData[name].trim().length < 8
    ) {
      setError("Tối thiểu 8 kí tự và tối đa 20 kí tự");
      return;
    }
    const regex = /^\+?[0-9]{1,3}\s?[0-9]{3,}$/;
    if (userData?.phone && !regex.test(userData.phone)) {
      // toast.error("Vui lòng nhập đúng định dạng số điện thoại.");
      setError("Vui lòng nhập đúng định dạng số điện thoại.");

      return;
    }
    if (userData?.name && userData?.name?.length > 20) {
      // toast.error("Tối đa 10 kí tự.");
      setError("Tối đa 20 kí tự.");

      return;
    }

    try {
      if (type === "password") {
        userData.email = user.email;
        console.log(userData);
        const userUpdate = await usersApi.changePassword(userData);
        dispatch(updateUserNotImage({ ...userData, field: name }));
        toast("Cập nhật thông tin thành công");
        setIsShow(false);
        setValue("password", null);
        setValue("oldPassword", null);
        setValue("retypePassword", null);

        return;
        return;
        return;
      }
      const userUpdate = await usersApi.updateUser(user?.slug, userData);
      dispatch(updateUserNotImage({ ...userData, field: name }));
      toast("Cập nhật thông tin thành công");
      setValue(name, null);
      setIsShow(false);
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra vui lòng thử lại sau.");
      setIsShow(false);
      navigate("/setting");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleUpdateUser)}
      className={` hover:bg-[#f6f6f6]  rounded-md border-b-2 ${
        isShow ? "bg-[#f6f6f6] py-4 px-[10px]" : ""
      }`}
    >
      {isShow ? (
        <div>
          <p className="flex items-center gap-2 text-[21px] font-semibold">
            <span>{children}</span>
            {title}
          </p>
          <div className="pl-8">
            {type === "default" ? (
              <div className="max-w-[240px] mt-2">
                <InputControlCommon
                  control={control}
                  name={name}
                  placeholder={user[name] || "********"}
                />
              </div>
            ) : (
              <div>
                <div className="max-w-[240px] mt-2">
                  <InputControlCommon
                    control={control}
                    name="oldPassword"
                    placeholder={"Mật khẩu cũ"}
                    type="password"
                  />
                </div>
                <div className="max-w-[240px] mt-2">
                  <InputControlCommon
                    control={control}
                    name="password"
                    placeholder="Mật khẩu mới"
                    type="password"
                  />
                </div>
                <div className="max-w-[240px] mt-2">
                  <InputControlCommon
                    control={control}
                    name="retypePassword"
                    placeholder="Nhập lại mật khẩu mới"
                    type="password"
                  />
                </div>
              </div>
            )}
            {error && (
              <span className="block font-medium text-sm text-primary transition-all duration-150">
                {error}
              </span>
            )}
            <div className="mt-2">
              <button
                type="submit"
                className="text-white bg-primary p-1 rounded-md"
              >
                Cập nhật
              </button>
              <span
                type="button"
                onClick={() => {
                  setIsShow(false);
                  setError("");
                }}
                className="text-white ml-2 bg-slate-400 p-1 px-2 rounded-md cursor-pointer"
              >
                Hủy
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-between cursor-pointer py-4 px-[10px]"
          onClick={() => {
            if (!isChange) return;
            setError("");
            setIsShow(true);
          }}
        >
          <div>
            <p className="flex items-center gap-2 text-[21px] font-semibold">
              <span>{children}</span>
              {user?.id ? (title ? title : user[name]) : ""}
            </p>
            {content ? <p>{content}</p> : null}
          </div>
          {name === "email" ? (
            ""
          ) : (
            <p className="w-9 h-9 rounded-full bg-[#eee] hover:bg-[#ccc] hover:text-primary transition-all  flex items-center justify-center">
              <FaPencilAlt />
            </p>
          )}
        </div>
      )}
    </form>
  );
}

export default CustomFieldEdit;
