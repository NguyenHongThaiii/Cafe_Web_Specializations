import React, { Children, useState } from "react";
import PropTypes from "prop-types";
import InputControlCommon from "../../../components/Form-Control/Input-Control-Common";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import usersApi from "../../../api/usersApi";
import { useDispatch } from "react-redux";
import { updateUserNotImage } from "../../Auth/authSlice";

CustomFieldEdit.propTypes = {
  name: PropTypes.string,
  user: PropTypes.object,
  errorMessage: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  isChange: PropTypes.bool,
};

function CustomFieldEdit({
  name = "",
  user = {},
  errorMessage = "",
  title = "",
  content = "",
  isChange = true,
  children,
}) {
  const { control, handleSubmit, setValue, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const [isShow, setIsShow] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleUpdateUser = async (userData) => {
    if (!userData[name] || userData[name].trim().length === 0) {
      setError(errorMessage);
      return;
    }
    try {
      const userUpdate = await usersApi.updateUser(user?.slug, userData);
      dispatch(updateUserNotImage({ ...userData, field: name }));
    } catch (error) {}
    setIsShow(false);
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
            <div className="max-w-[240px] mt-2">
              <InputControlCommon
                control={control}
                name={name}
                placeholder={user[name] || "********"}
              />
            </div>
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
          <p className="w-9 h-9 rounded-full bg-[#eee] hover:bg-[#ccc] hover:text-primary transition-all  flex items-center justify-center">
            <FaPencilAlt />
          </p>
        </div>
      )}
    </form>
  );
}

export default CustomFieldEdit;
