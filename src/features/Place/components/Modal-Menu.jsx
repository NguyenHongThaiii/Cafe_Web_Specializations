import PropTypes from "prop-types";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { useHide } from "../../../context/Global-Provider";
import ModalImage from "./Modal-Image";

ModalMenu.propTypes = {
  data: PropTypes.object,
  hideModalMenu: PropTypes.func,
  index: PropTypes.number,
};

function ModalMenu({ data = {}, hideModalMenu }) {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useHide();
  const [indexCurr, setIndexCurr] = useState(0);
  const handleShowModalImage = (index) => {
    setShow(true);
    setHide(false);
    setIndexCurr(index);
  };
  return createPortal(
    <div className="fixed z-[10000] inset-0 bg-[rgba(0,0,0,.65)]">
      <div className="flex items-center justify-center h-full">
        <div className="w-[680px] max-h-[96%]  text-black relative bg-white rounded-[10px] overflow-hidden  shadow-[rgb(0,0,0,0.15)_0px_2px_8px]">
          <div className="relative h-[60px] px-[60px] text-center border-b-[1px] border-b-[rgba(0,0,0,.1)]">
            <h1 className="text-center font-bold text-[21px] leading-[60px]">
              Menu của {data?.name}
            </h1>
            <div
              onClick={hideModalMenu}
              className="absolute top-[12px] right-[16px] w-9 h-9 text-[#666] bg-[#e4e6eb] rounded-full flex items-center justify-center text-[22px] cursor-pointer hover:bg-[#cdcfd4] transition-all"
            >
              <FaTimes />
            </div>
          </div>

          <div className="p-4 overflow-y-auto">
            {data?.menu?.length > 0 ? (
              <div className="grid lg:grid-cols-3 grid-cols-2 gap-x-3 gap-y-3 min-h-[200px] max-h-[calc(96vh_-_100px)]  ">
                {data?.menu?.map((img, index) => (
                  <img
                    onClick={() => handleShowModalImage(index)}
                    key={index}
                    src={`${import.meta.env.VITE_URL_BLOGS}${img}`}
                    alt={data?.name}
                    className="w-full h-full object-cover rounded-[10px] border-primary border max-h-[220px] cursor-pointer"
                  />
                ))}
              </div>
            ) : (
              <div className="my-10 mx-5 flex items-center flex-col lg:h-full h-[96vh]">
                <img
                  src="/img/empty_menu.svg"
                  alt="empty_menu"
                  className="h-[180px] mb-5"
                />
                <span className="text-base font-bold mb-1">
                  Opps, menu chưa được cập nhật!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {show && (
        <ModalImage
          data={data}
          imageList={data?.menu}
          index={indexCurr}
          hideModalImage={() => setShow(false)}
          length={data?.menu?.length}
        />
      )}
    </div>,
    document.querySelector("body")
  );
}

export default ModalMenu;
