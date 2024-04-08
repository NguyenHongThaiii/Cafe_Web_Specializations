import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import TimeStartFilter from "../../SearchPage/components/Time-Start-Filter";
import AreaFilter from "../../SearchPage/components/Area-Filter";
import { useHide } from "../../../context/Global-Provider";

BlogSaveFilterMobile.propTypes = {
  show: PropTypes.bool,
  onShow: PropTypes.func,
  data: PropTypes.object,
  handleReset: PropTypes.func,
  handleOnChange: PropTypes.func,
  filters: PropTypes.object,
};

function BlogSaveFilterMobile({
  show = false,
  onShow = null,
  data = {},
  handleReset = null,
  handleOnChange = null,
  filters = {},
}) {
  const [hide, setHide] = useHide();

  return createPortal(
    <div
      className={`fixed ${
        show ? "opacity-100 visible " : "opacity-0 invisible"
      }  inset-0 bg-white overflow-auto pb-[50px] transition-all duration-300 z-[1000] ${
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

      {show && (
        <div className="mt-[65px] px-2">
          <TimeStartFilter
            title="Giờ mở cửa"
            type="radio"
            data={data?.timeStart || []}
            name="timeStart"
            onChange={handleOnChange}
            className="flex-row"
            filters={filters}
          />

          <AreaFilter
            title="Khu vực"
            data={data?.area || []}
            name="area"
            onChange={handleOnChange}
            mobile={true}
            filters={filters}
            type="radio"
          />
        </div>
      )}

      {createPortal(
        <div
          className={`fixed z-[100000] inset-x-0 bottom-0 flex bg-white p-[10px] gap-x-3 items-center transition-all duration-300  ${
            show ? "translate-y-0 opacity-100 " : "translate-y-[100%] opacity-0"
          }`}
        >
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

export default BlogSaveFilterMobile;
