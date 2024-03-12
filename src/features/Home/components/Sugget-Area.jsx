import React from "react";

SuggestArea.propTypes = {};

function SuggestArea() {
  return (
    <section>
      <div className="max-w-[1200px] px-4 mx-auto pl-4 pb-[2px] mb-[72px] mt-[-6px] lg:m-0 lg:mx-auto  lg:pb-9">
        <div className="flex justify-center">
          <div className="w-[124px]  lg:max-w-[220px]">
            <img
              src="/img/suggest-place.svg"
              alt="suggest"
              className="w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center py-[20px] pr-[10px] lg:p-5 ">
            <h2 className=" text-[18px] lg:text-[28px] font-bold mb-[20px]">
              Chúng tôi đang bỏ lỡ địa điểm nào bạn biết ?
            </h2>
            <button
              className="  text-white  bg-primary    font-semibold  uppercase
            
            
             h-[30px] text-xs px-[14px] leading-[30px]  rounded-[10px] hover:bg-[#be0129] transition-all duration-300 lg:h-[40px] lg:text-base lg:px-5 lg:leading-[40px]"
            >
              Đóng góp địa điểm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SuggestArea;
