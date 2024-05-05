import React from "react";
import PropTypes from "prop-types";
import { handleStyleGradient } from "../../../utils";
import { useNavigate } from "react-router-dom";

PurposeItem.propTypes = {
  items: PropTypes.object,
  index: PropTypes.number,
};

function PurposeItem({ item, index = 0 }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/search?purposes=${item?.slug}`);
  };
  return (
    <div
      className="relative  overflow-hidden cursor-pointer hover-scale"
      onClick={handleClick}
    >
      <div className="overflow-hidden rounded-[10px] w-full h-[180px] lg:h-[220px] lg:w-[372px] ">
        <img
          src={item?.image?.url}
          alt={item?.name}
          className="object-cover w-full h-full transition-all duration-1000"
        />
      </div>
      <div className="absolute inset-0 z-30 text-white flex items-center justify-center  font-bold text-[26px] lg:text-[32px]">
        <span>{item?.name}</span>
      </div>
      <div
        className={`absolute inset-0  ${handleStyleGradient(
          index
        )} rounded-[10px] lg:max-w-[372px] overflow-hidden`}
      ></div>
    </div>
  );
}

export default PurposeItem;
