import React from "react";
import PropTypes from "prop-types";
import InputControlCommon from "../../../components/Form-Control/Input-Control-Common";
import TextareaCustomControl from "../../../components/Form-Control/Textarea-Custom-Control";
import SelectControl from "../../../components/Form-Control/Select-Control";

BasicInfor.propTypes = {
  control: PropTypes.object,
  areas: PropTypes.array,
  onChange: PropTypes.func,
};

function BasicInfor({ control = null, areas = [], onChange = null }) {
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
        <div className="py-5 px-4 flex flex-col gap-5">
          <div className="flex items-center ">
            <label htmlFor="name" className="min-w-20 text-[14px] mr-16">
              Tên quán
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <InputControlCommon
              control={control}
              name="name"
              id="name"
              type="text"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="flex items-center ">
            <label htmlFor="area_id" className="min-w-20 text-[14px] mr-16">
              Khu vực
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <SelectControl
              control={control}
              name="area_id"
              id="area_id"
              options={options}
              className="w-full h-[38px]"
            />
          </div>
          <div className="flex items-center ">
            <label htmlFor="address" className="min-w-20 text-[14px] mr-16">
              Địa chỉ
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <InputControlCommon
              control={control}
              name="address"
              id="address"
              type="text"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="flex items-center ">
            <label htmlFor="description" className="min-w-20 text-[14px] mr-16">
              Giới thiệu
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <TextareaCustomControl
              control={control}
              name="description"
              id="description"
              placeholder="example@gmail.com"
              className="w-full mt-0"
              onChange={onChange}
              onKeyPress={() => undefined}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicInfor;
