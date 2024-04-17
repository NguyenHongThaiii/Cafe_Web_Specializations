import React, { useState } from "react";
import PropTypes from "prop-types";
import InputControlCommon from "../../../components/Form-Control/Input-Control-Common";
import TextareaCustomControl from "../../../components/Form-Control/Textarea-Custom-Control";
import SelectControl from "../../../components/Form-Control/Select-Control";

BasicInfor.propTypes = {
  control: PropTypes.object,
  areas: PropTypes.array,
  onChange: PropTypes.func,
  formState: PropTypes.object,
  errorMessage: PropTypes.string,
  blog: PropTypes.object,
};

function BasicInfor({
  control = null,
  areas = [],
  onChange = null,
  formState = null,
  errorMessage = "",
  blog = {},
}) {
  const options = areas.map((area) => ({
    id: area?.id,
    label: area?.name,
    value: area?.id,
  }));
  return (
    <>
      <p className="text-[21px] font-medium text-primary pb-2  border-b-[1px]">
        Thông tin cơ bản
      </p>
      <div>
        <div className="py-5 lg:px-4 flex flex-col gap-5 px-0">
          <div className="flex items-center ">
            <label
              htmlFor="name"
              className="lg:min-w-40 min-w-20 text-[14px] mr-16 xs:mr-3"
            >
              Tên quán
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <InputControlCommon
              control={control}
              name="name"
              id="name"
              type="text"
              placeholder="Cafe Ha Noi"
              data={blog?.name}
            />
          </div>
          {formState?.errors["name"] && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {formState.errors["name"]?.message}
            </span>
          )}
          <div className="flex items-center ">
            <label
              htmlFor="area_id"
              className="lg:min-w-40 min-w-20 text-[14px] mr-16 xs:mr-3"
            >
              Khu vực
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <SelectControl
              control={control}
              name="area_id"
              id="area_id"
              options={options}
              className="w-full h-[38px]"
              defaultValue={blog?.areas?.length > 0 ? blog?.areas[0]?.id : 0}
            />
          </div>
          {formState?.errors["area_id"] && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {formState.errors["area_id"]?.message}
            </span>
          )}
          <div className="flex items-center ">
            <label
              htmlFor="location"
              className="lg:min-w-40 min-w-20 text-[14px] mr-16 xs:mr-3"
            >
              Địa chỉ
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <InputControlCommon
              control={control}
              name="location"
              id="location"
              type="text"
              placeholder="Dong Da Ha Noi"
            />
          </div>
          {formState?.errors["location"] && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {formState.errors["location"]?.message}
            </span>
          )}
          <div className="flex items-center ">
            <label
              htmlFor="description"
              className="lg:min-w-40 min-w-20 text-[14px] mr-16 xs:mr-3"
            >
              Giới thiệu
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <TextareaCustomControl
              control={control}
              name="description"
              id="description"
              placeholder="Quan cafe rat dep"
              className="w-full mt-0"
              onChange={onChange}
              onKeyPress={null}
              // defaultValue="12323"
              dValue={blog?.description}
            />
          </div>
          {errorMessage && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {errorMessage}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default BasicInfor;
