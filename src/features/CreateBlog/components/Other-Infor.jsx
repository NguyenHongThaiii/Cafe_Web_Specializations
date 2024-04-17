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
  formState: PropTypes.object,
};

function OtherInfor({
  control = null,
  kinds = [],
  conveniences = [],
  purposes = [],
  onChange = null,
  formState = null,
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
        <div className="py-5 px-4 flex  items-center xs:px-0">
          <div className="flex items-center justify-between flex-1 gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="startTime"
                className="lg:min-w-40 min-w-[92px] text-[14px]"
              >
                Thời gian mở cửa{" "}
                <span className="text-primary pl-1 font-bold">*</span>
              </label>
              <InputControlCommon
                control={control}
                name="startTime"
                id="startTime"
                type="text"
                placeholder="07:00"
              />
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="endTime"
                className="min-w-[60px] text-[14px] mr-4"
              >
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
        </div>
        <div className="flex items-center justify-between gap-10 px-4">
          {formState?.errors["startTime"] && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {formState.errors["startTime"]?.message}
            </span>
          )}
          {formState?.errors["endTime"] && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {formState.errors["endTime"]?.message}
            </span>
          )}
        </div>
        <div className="py-5 px-4 flex  items-center xs:px-0">
          <div className="flex items-center justify-between flex-1 gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="priceMin"
                className="lg:min-w-40 min-w-[92px] text-[14px]"
              >
                Khoảng giá
                <span className="text-primary pl-1 font-bold">*</span>
              </label>
              <InputControlCommon
                control={control}
                name="priceMin"
                id="priceMin"
                type="number"
                placeholder="0"
              />
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="priceMax"
                className="min-w-[60px] text-[14px] mr-4"
              >
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
        </div>
        <div className="flex items-center justify-between gap-10 px-4">
          {formState?.errors["priceMin"] && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {formState.errors["priceMin"]?.message}
            </span>
          )}
          {formState?.errors["priceMax"] && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {formState.errors["priceMax"]?.message}
            </span>
          )}
        </div>
        <div className="py-5 px-4 flex  items-center xs:px-0">
          <div className="flex items-center justify-between flex-1 gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="latitude"
                className="lg:min-w-40 min-w-[92px] text-[14px] "
              >
                Vĩ độ
              </label>
              <InputControlCommon
                control={control}
                name="latitude"
                id="latitude"
                type="text"
                placeholder="21.0336724"
              />
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="longitude"
                className="min-w-[60px] text-[14px] mr-4"
              >
                Kinh độ
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
        </div>
        <div className="flex items-center justify-between gap-10 px-4">
          {formState?.errors["latitude"] && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {formState.errors["latitude"]?.message}
            </span>
          )}
          {formState?.errors["longitude"] && (
            <span className="block font-medium text-sm text-primary transition-all duration-150">
              {formState.errors["longitude"]?.message}
            </span>
          )}
        </div>
        <div className="py-5 px-4 flex gap-5 items-center xs:px-0">
          <div className="flex items-center flex-1">
            <label
              htmlFor="kind_id"
              className="lg:min-w-40 min-w-[92px] text-[14px]"
            >
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
        {formState?.errors["kind_id"] && (
          <span className="block font-medium text-sm text-primary transition-all duration-150">
            {formState.errors["kind_id"]?.message}
          </span>
        )}
        <div className="py-5 px-4 flex gap-5 items-center xs:px-0">
          <div className="flex items-center flex-1">
            <label
              htmlFor="convenience_id"
              className="lg:min-w-40 min-w-[92px] text-[14px]"
            >
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
        {formState?.errors["convenience_id"] && (
          <span className="block font-medium text-sm text-primary transition-all duration-150">
            {formState.errors["convenience_id"]?.message}
          </span>
        )}
        <div className="py-5 px-4 flex gap-5 items-center xs:px-0">
          <div className="flex items-center flex-1">
            <label
              htmlFor="purpose_id"
              className="lg:min-w-40 min-w-[92px] text-[14px]"
            >
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
        </div>{" "}
        {formState?.errors["purpose_id"] && (
          <span className="block font-medium text-sm text-primary transition-all duration-150">
            {formState.errors["purpose_id"]?.message}
          </span>
        )}
      </div>
    </>
  );
}

export default OtherInfor;
