import React from "react";
import PropTypes from "prop-types";
import SelectControl from "../../../components/Form-Control/Select-Control";
import InputControlCommon from "../../../components/Form-Control/Input-Control-Common";

OtherInfor.propTypes = {
  control: PropTypes.object,
  kinds: PropTypes.array,
  conveniences: PropTypes.array,
  purposes: PropTypes.array,
  onChange: PropTypes.func,
};

function OtherInfor({
  control = [],
  kinds = [],
  conveniences = [],
  purposes = [],
  onChange = null,
}) {
  const kindOptions = kinds.map((kind) => ({
    id: kind?.id,
    label: kind?.name,
    value: kind?.id,
  }));
  const conOptions = conveniences.map((con) => ({
    id: con?.id,
    label: con?.name,
    value: con?.id,
  }));
  const purposesOptions = purposes.map((purpose) => ({
    id: purpose?.id,
    label: purpose?.name,
    value: purpose?.id,
  }));
  return (
    <>
      <p className="text-[21px] font-medium text-primary pb-2  border-b-[1px]">
        Thông tin khác
      </p>
      <div>
        <div className="py-5 px-4 flex  items-center">
          <label htmlFor="startTime" className="min-w-36 text-[14px]">
            Thời gian mở cửa
            <span className="text-primary pl-1 font-bold">*</span>
          </label>

          <div className="flex items-center justify-between flex-1 gap-8">
            <InputControlCommon
              control={control}
              name="startTime"
              id="startTime"
              type="text"
              placeholder="07:00"
            />
            <label htmlFor="endTime" className="min-w-[60px] text-[14px]">
              Đến:
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <InputControlCommon
              control={control}
              name="endTime"
              id="endTime"
              type="text"
              placeholder="20:00"
            />
          </div>
        </div>
        <div className="py-5 px-4 flex  items-center">
          <label htmlFor="priceMin" className="min-w-36 text-[14px]">
            Khoảng giá
            <span className="text-primary pl-1 font-bold">*</span>
          </label>
          <div className="flex items-center justify-between flex-1 gap-8">
            <InputControlCommon
              control={control}
              name="priceMin"
              id="priceMin"
              type="number"
              placeholder="0"
            />
            <label htmlFor="priceMax" className="min-w-[60px] text-[14px]">
              Đến:
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <InputControlCommon
              control={control}
              name="priceMax"
              id="priceMax"
              type="number"
              placeholder="1000000"
            />
          </div>
        </div>
        <div className="py-5 px-4 flex  items-center">
          <label htmlFor="latitude" className="min-w-36 text-[14px]">
            Vĩ độ
            <span className="text-primary pl-1 font-bold">*</span>
          </label>
          <div className="flex items-center justify-between flex-1 gap-8">
            <InputControlCommon
              control={control}
              name="latitude"
              id="latitude"
              type="text"
              placeholder="21.0336724"
            />
            <label htmlFor="longitude" className="min-w-[60px] text-[14px]">
              Kinh độ
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <InputControlCommon
              control={control}
              name="longitude"
              id="longitude"
              type="text"
              placeholder="105.8109417"
            />
          </div>
        </div>
        <div className="py-5 px-4 flex gap-5 items-center">
          <div className="flex items-center flex-1">
            <label htmlFor="kind_id" className="min-w-36 text-[14px]">
              Kiểu quán
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <SelectControl
              control={control}
              name="kind_id"
              id="kind_id"
              options={kindOptions}
              className="w-full h-[38px]"
            />
          </div>
        </div>
        <div className="py-5 px-4 flex gap-5 items-center">
          <div className="flex items-center flex-1">
            <label htmlFor="convenience_id" className="min-w-36 text-[14px]">
              Tiện ích
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <SelectControl
              control={control}
              name="convenience_id"
              id="convenience_id"
              options={conOptions}
              className="w-full h-[38px]"
            />
          </div>
        </div>
        <div className="py-5 px-4 flex gap-5 items-center">
          <div className="flex items-center flex-1">
            <label htmlFor="purpose_id" className="min-w-36 text-[14px]">
              Mục đích
              <span className="text-primary pl-1 font-bold">*</span>
            </label>
            <SelectControl
              control={control}
              name="purpose_id"
              id="purpose_id"
              options={purposesOptions}
              className="w-full h-[38px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OtherInfor;
