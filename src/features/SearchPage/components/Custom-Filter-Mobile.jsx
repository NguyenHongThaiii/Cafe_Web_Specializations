import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useHide } from "../../../context/Global-Provider";
import { removeLocalStorage } from "../../../utils";
import { ResetContext } from "../pages/Search-Page";
import AreaFilter from "./Area-Filter";
import ConvenientFilter from "./Convenient-Filter";
import PurposeFilter from "./Purpose-Filter";
import TimeStartFilter from "./Time-Start-Filter";
import TypeFilter from "./Type-Filter";

CustomFilterMobile.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  show: PropTypes.bool,
  onShow: PropTypes.func,
  parentFilters: PropTypes.object,
};

function CustomFilterMobile({
  data = {},
  onChange = null,
  show = false,
  onShow = null,
  parentFilters = {},
}) {
  if (typeof document === "undefined")
    return <div className="modal">Modal</div>;

  const [filters, setFilers] = useState({});
  const [hide, setHide] = useHide();
  const navigate = useNavigate();

  const handleOnChange = (value) => {
    // setFilers((prev) => ({ ...prev, ...value }));
    onChange({ ...filters, ...value });
    // onShow();
    // setHide(false);
  };
  const handleOnClick = () => {
    if (!onChange) return null;
    onChange(filters);
    onShow();
    setHide(false);
  };
  const handleReset = () => {
    if (!onChange) return null;
    setFilers({});

    onChange({
      topic: undefined,
      area: undefined,
      convenient: undefined,
      type: undefined,
      price: undefined,
      timeStart: undefined,
      name: "",
    });
    onShow();
    setHide(false);
    removeLocalStorage("search_now");
    navigate("/search");
  };
  return createPortal(
    <div
      className={`fixed inset-0 bg-white overflow-auto pb-[50px] transition-all duration-300 z-[1000] ${
        show ? "translate-y-0 opacity-100 " : "translate-y-[100%] opacity-0"
      }`}
    >
      <div className="absolute top-0 inset-x-0 bg-primary text-white text-center font-bold text-lg leading-0  py-4 px-6 border-b-[#f0f0f0] border-b-[1px] ">
        <div
          onClick={() => {
            onShow();
            setHide(false);
          }}
          className="absolute  inset-y-0 text-white right-0 w-[40px] flex items-center justify-center"
        >
          <MdOutlineClose className="w-[40px] h-[30px] cursor-pointer font-bold" />
        </div>
        Bộ lộc
      </div>

      <div className="mt-[65px]">
        {/* <TimeStartFilter
          title="Giờ mở cửa"
          type="radio"
          data={data?.timeStart || []}
          name="timeStart"
          onChange={handleOnChange}
          className="flex-row"
        /> */}

        <AreaFilter
          title="Khu vực"
          data={data?.areas || []}
          name="area"
          onChange={handleOnChange}
          filters={filters}
          mobile={true}
        />
        <PurposeFilter
          title="Mục đích"
          data={data?.topic?.map((item) => item.name) || []}
          name="topic"
          onChange={handleOnChange}
          mobile={true}
          filters={parentFilters}
        />
        <TypeFilter
          title="Kiểu quán"
          data={data?.type || []}
          name="type"
          onChange={handleOnChange}
          mobile={true}
          filters={parentFilters}
        />
        <ConvenientFilter
          title="Tiện ích"
          data={data?.convenient || []}
          name="convenient"
          onChange={handleOnChange}
          mobile={true}
          filters={parentFilters}
        />
      </div>

      {createPortal(
        <div
          className={`fixed z-[100000] inset-x-0 bottom-0 flex bg-white p-[10px] gap-x-3 items-center transition-all duration-300  ${
            show ? "translate-y-0 opacity-100 " : "translate-y-[100%] opacity-0"
          }`}
        >
          {/* <button
            onClick={handleOnClick}
            className="border-primary border bg-primary text-white flex-grow-[5] text-base py-[6px] px-5 rounded-[4px] h-full"
          >
            Áp dụng
          </button> */}
          <button
            onClick={handleReset}
            className="border-primary border text-primary bg-white grow text-base py-[6px] px-5 rounded-[4px]"
          >
            Đặt lại
          </button>
        </div>,
        document.querySelector("body")
      )}
    </div>,
    document.querySelector("body")
  );
}

export default CustomFilterMobile;
