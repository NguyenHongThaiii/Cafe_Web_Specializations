import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

ProminentPlaceItem.propTypes = {
  items: PropTypes.object,
};

function ProminentPlaceItem({ item }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/place/${item?.slug}`);
  };
  return (
    <Link
      to={`/place/${item?.slug}`}
      onClick={handleClick}
      target="_blank"
      className="rounded-[10px] flex-shrink-0 block  cursor-pointer hover-scale hover:shadow-2xl transition-all duration-200 overflow-hidden shadow-[0_1px_4px_rgb(0,0,0,0.15)]"
    >
      <div className="w-full  leading-[0] overflow-hidden h-[200px] md:h-[240px] lg:max-w-[280px]">
        <img
          src={
            item?.listImage !== null &&
            item?.listImage?.length > 0 &&
            item?.listImage[0]?.url
          }
          alt={item?.name}
          className="rounded-t-[10px] w-full h-full object-cover transition-all duration-1000"
        />
      </div>
      <div className="px-[15px] py-[2px] ">
        <p className="text-text font-bold text-[18px] pt-[6px] pb-[2px]">
          {item?.name}
        </p>
        <p className="text-black text-[14px] pb-[6px]">{item?.location}</p>
      </div>
    </Link>
  );
}

export default ProminentPlaceItem;
