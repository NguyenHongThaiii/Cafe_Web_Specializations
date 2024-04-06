import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

CustomRate.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
};

function CustomRate({ name = "", title = "", onChange = null }) {
  const nodeRef = useRef(null);
  const [status, setStatus] = useState(true);
  const [count, setCount] = useState(5);
  useEffect(() => {
    let listStar = document.querySelectorAll(`.mouseover_${name}`);

    const handleMouseout = (event) => {
      const cur = nodeRef.current;
      listStar = cur.querySelectorAll(`.mouseover_${name}`);
      listStar.forEach((item, index) => {
        item.className = `cursor-pointer absolute inset-0 z-20  transition-all w-10 h-10  mouseover_${name} text-primary   `;
      });
    };

    const handleMouseover = (event) => {
      const cur = nodeRef.current;
      listStar = cur.querySelectorAll(`.mouseover_${name}`);
      const indexStar = [...listStar].findIndex((item) =>
        item.contains(event.target)
      );

      listStar.forEach((item, index) => {
        if (index > indexStar) {
          item.className = `cursor-pointer absolute inset-0 z-20 transition-all text-[#d8d8d8]  w-10 h-10  mouseover_${name} hover:opacity-0 hover:invisible z-0`;
        }
      });
    };

    if (nodeRef && nodeRef.current && status) {
      listStar.forEach((star) => {
        star.addEventListener("mouseover", handleMouseover);
        star.addEventListener("mouseout", handleMouseout);
      });
    }

    return () => {
      listStar.forEach((star) => {
        star.removeEventListener("mouseover", handleMouseover);
        star.removeEventListener("mouseout", handleMouseout);
      });
    };
  }, [status]);

  const handleClick = (index) => {
    if (!onChange) return null;

    setCount(index);
    setStatus(false);
    onChange({ [name]: index });
  };
  const handleShowStatus = () => {
    switch (count) {
      case 1:
        return "Quá tệ";
      case 2:
        return "Trung bình";
      case 3:
        return "Bình thường";
      case 4:
        return "Tốt";
      case 5:
        return "Tuyệt vời";

      default:
        return "Tuyệt vời";
    }
  };
  return (
    <div className="pl-[10px] pr-5 flex items-center justify-between mb-1">
      <span className="flex-1">{title}</span>

      <div className="flex  grow" ref={nodeRef}>
        {Array.from(new Array(5)).map((item, index) => (
          <div
            onClick={() => handleClick(index + 1)}
            key={index}
            className="relative w-10 h-10 pl-[36px] "
          >
            <div
              className={`cursor-pointer absolute inset-0 z-20 transition-all  duration-300 mouseover_${name} ${
                index + 1 > count ? "text-[#d8d8d8]" : "text-primary"
              }`}
            >
              <FaStar className="w-8 h-8 m-0 " />
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1">
        <div className="relative inline-block text-base h-8 leading-[32px] pr-3 pl-[6px] ml-5  text-white bg-primary rounded-br-[4px] rounded-tr-[4px] ">
          <span className="font-medium whitespace-normal min-w-[92px] block ">
            {handleShowStatus()}
          </span>
          <div className="absolute border-transparent border-r-primary border-[16px] border-l-[0px] w-0 h-0  top-0 left-[-16px] "></div>
        </div>
      </div>
    </div>
  );
}

export default CustomRate;

{
  /* <svg
  viewBox="64 64 896 896"
  focusable="false"
  data-icon="star"
  width="1em"
  height="1em"
  fill="currentColor"
  aria-hidden="true"
  style="color: #333;"
>
  <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
</svg>; */
}

{
  /* <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="color: #333;"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg> */
}
