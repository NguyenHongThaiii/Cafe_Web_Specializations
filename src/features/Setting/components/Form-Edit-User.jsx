import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import CustomFieldEdit from "./Custom-Field-Edit";

FormEditUser.propTypes = {};

function FormEditUser(props) {
  const user = useSelector((state) => state.auth.current);
  return (
    <div>
      <CustomFieldEdit
        name="name"
        user={user}
        errorMessage="Tên không được để trống"
        title={user?.name}
      >
        <FaRegUser />
      </CustomFieldEdit>
      <CustomFieldEdit
        name="password"
        user={user}
        errorMessage="Mật khẩu không được để trống"
        title="Mật khẩu"
        content="********"
        type="password"
      >
        <FaRegUser />
      </CustomFieldEdit>
      <CustomFieldEdit
        name="email"
        user={user}
        errorMessage="Email không được để trống"
        title="Email"
        content={user?.email}
        isChange={false}
      >
        <FaRegUser />
      </CustomFieldEdit>
      <CustomFieldEdit
        name="phone"
        user={user}
        errorMessage="Số điện thoại không được để trống"
        title="Điện thoại"
        content={user?.phone}
      >
        <FaRegUser />
      </CustomFieldEdit>
    </div>
  );
}

export default FormEditUser;
