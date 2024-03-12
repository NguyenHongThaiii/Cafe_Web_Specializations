import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
NearAreaItem.propTypes = {
  item: PropTypes.object,
};

function NearAreaItem({ item }) {
  const navigate = useNavigate();
  const name =
    item?.startLocation?.address?.split(",")[
      item?.startLocation?.address?.split(",")?.length - 1
    ];
  const handleClick = () => {
    navigate(`/search?area=${item?.area}`);
  };
  return (
    <div
      onClick={handleClick}
      className="relative  rounded-[10px] overflow-hidden w-full hover-scale h-[200px] md:h-[300px] lg:h-[330px]  lg:max-w-[273px]"
    >
      <img
        src={item?.image?.url}
        alt={item?.name}
        className="w-full h-full object-cover rounded-[10px] transition-all duration-1000"
      />
      <div className="absolute inset-0 flex justify-end text-white flex-col px-[20px] py-[16px] cursor-pointer bg-near-gradient-webkit">
        <h4 className="text-[24px] text-white font-bold ">{item?.name}</h4>
        <p className="text-[14px] font-normal ">{item?.slug}</p>
      </div>
    </div>
  );
}

export default NearAreaItem;
