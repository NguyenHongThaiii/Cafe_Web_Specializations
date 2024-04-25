import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SearchModal from "./Search-Modal";
import SearchModalMobile from "./Search-Modal-Mobile";
import { getLocalStorage } from "../../../utils";
import { useNavigate } from "react-router-dom";
Slider.propTypes = {};

function Slider(props) {
  const [state, setState] = useState("Tìm Góc Cafe - Thỏa Sức Sống Ảo...");
  const [show, setShow] = useState(false);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const timerId = setInterval(() => {
      setState((prev) => {
        const str = "Tìm Góc Cafe - Thỏa Sức Sống Ảo...";
        return str === prev ? "Đi & Khám Phá Điểm Hẹn Hấp Dẫn..." : str;
      });
    }, 10000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const handleOnClick = () => {
    setShow((prev) => !prev);
  };
  const handleSubmit = () => {
    if (search?.name) navigate(`/search?name=${search?.name}`);
    else navigate(`/search`);
  };
  return (
    <section className="relative  flex items-center justify-center h-[240px] lg:h-[500px] z-10 ">
      <div
        className={`absolute inset-0  ${
          show
            ? "lg:before:fixed lg:before:inset-0 lg:before:bg-[#232a31] lg:before:opacity-90"
            : ""
        }`}
      >
        <img src="/img/slider.webp" alt="" className="w-full h-full " />
      </div>
      <div className="absolute inset-0 bg-[#000000ad] z-10"></div>
      <div className={`relative z-10 w-[1200px] m-auto px-4`}>
        <div className="mb-5 lg:mb-10">
          {/* <div
            className={`relative flex items-center justify-center before:content-[''] before:absolute before:top-0 before:right-[16%] before:w-[3px] before:h-[60px] 
            
            before:bg-white  before:animate-[blink_0.8s_steps(3)_infinite]`}
          >
            <span
              className={`text-[40px] text-white  font-semibold overflow-hidden whitespace-nowrap  text-center animate-[typewriter_10s_steps(34)_infinite_alternate]`}
            >
              {state}
            </span>
          </div>
          <span className="text-[#ccc] text-[16px] font-semibold text-center block ">
            Mang đến cho bạn những sự lựa chọn tốt nhất cho điểm hẹn cafe
          </span> */}

          {/* tesst */}
          <div className={`flex justify-center items-center`}>
            <span
              className={`text-xl lg:text-[40px] lg:h-[56px] flex items-center  text-white whitespace-nowrap overflow-hidden font-semibold border-r-[5px] animate-typingMobile lg:animate-typing transition-all    ]`}
            >
              {state}
            </span>
          </div>
          <span className="text-[#ccc] text-[16px] font-semibold text-center hidden lg:block ">
            Mang đến cho bạn những sự lựa chọn tốt nhất cho điểm hẹn cafe
          </span>
        </div>

        <div
          className={`flex gap-x-[10px] w-full ${
            show && "lg:mb-[100%] transition-all duration-500"
          }`}
        >
          <div
            className="grow relative "
            onClick={!show ? handleOnClick : null}
          >
            <i className="fa-solid fa-magnifying-glass lg:hidden absolute r-0 top-[5px] bottom-0 left-[6px]  w-10 h-10 text-base text-[#000] flex items-center justify-center"></i>
            <input
              placeholder="Tên quán, khu vực, kiểu quán..."
              type="text"
              className="rounded-full lg:rounded-[10px] font-normal cursor-text w-full h-[50px] py-[10px] pl-10 pr-[30px] text-base leading-[1.5]  border-none outline-none text-[#595b5d] lg:text-xl bg-white lg:h-[65px] lg:p-5"
            />
            <SearchModal
              show={show}
              onShow={handleOnClick}
              onSearch={(value) => setSearch(value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="shrink text-xl bg-primary text-white h-[65px] w-[200px] rounded-[10px] font-semibold hidden lg:block"
          >
            <i className="fa-solid fa-magnifying-glass pr-[6px] text-2xl inline-block w-[30px]"></i>
            Tìm quán
          </button>
        </div>
      </div>
      <SearchModalMobile show={show} onShow={handleOnClick} />
    </section>
  );
}

export default Slider;
