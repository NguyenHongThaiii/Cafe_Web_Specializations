import PropTypes from "prop-types";
import React from "react";
import AreaFilter from "./Area-Filter";
import ConvenientFilter from "./Convenient-Filter";
import PriceFilter from "./Price-Filter";
import PurposeFilter from "./Purpose-Filter";
import TypeFilter from "./Type-Filter";

CustomLayoutFilter.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  filters: PropTypes.object,
};

function CustomLayoutFilter({ data = {}, onChange = null, filters = {} }) {
  const handleOnChange = (value, event) => {
    if (!onChange) return null;
    onChange(value);
  };
  return (
    <div className="w-1/4 p-3 h-full hidden lg:block">
      <div className="shadow-xl relative rounded-[10px] h-[152px] flex items-center justify-center mb-5">
        <img
          src="/img/map.png"
          alt=""
          className="absolute inset-0 h-full object-cover z-[-1]"
        />
        <button className="font-bold text-sm border-2 border-black bg-white h-[40px] py-[2px] px-[10px] rounded-[10px] hover:bg-[#eee] transition-all duration-300">
          Xem bản đồ
        </button>
      </div>

      <div className="px-[14px] py-[10px] rounded-[10px] drop-shadow-2xl bg-white">
        <div className=" ">
          <h2 className="py-4 text-[21px] font-semibold  border-b border-b-[#e0e0e0]">
            Lọc kết quả
          </h2>
        </div>
        <div>
          {/* <TimeStartFilter
            title="Giờ mở cửa"
            type="radio"
            data={data?.timeStart || []}
            name="timeStart"
            onChange={handleOnChange}
            col={true}
          /> */}
          <AreaFilter
            title="Khu vực"
            data={data?.areas || []}
            name="area"
            onChange={handleOnChange}
            filters={filters}
          />
          <PurposeFilter
            title="Mục đích"
            data={data?.purposes || []}
            name="topic"
            onChange={handleOnChange}
            filters={filters}
          />
          <PriceFilter
            title="Khoảng giá"
            data={data?.price || []}
            name="price"
            onChange={handleOnChange}
            filters={filters}
          />
          <TypeFilter
            title="Kiểu quán"
            data={data?.kinds || []}
            name="type"
            onChange={handleOnChange}
            filters={filters}
          />
          <ConvenientFilter
            title="Tiện ích"
            data={data?.conveniences || []}
            name="convenient"
            onChange={handleOnChange}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomLayoutFilter;
