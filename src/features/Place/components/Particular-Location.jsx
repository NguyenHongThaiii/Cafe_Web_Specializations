import React from "react";
import PropTypes from "prop-types";

import { FaDirections } from "react-icons/fa";

ParticularLocation.propTypes = {
  data: PropTypes.object,
};

function ParticularLocation({ data = {} }) {
  return (
    <div className="pt-1 px-[14px] pb-[10px] mb-[6px] shadow-[0_1px_4px_rgb(0,0,0,0.3)]  rounded-[10px] flex-1  ">
      <h2 className="text-[21px] font-semibold">Địa điểm cụ thể</h2>
      <div className=" rounded-[10px] overflow-hidden relative  h-[calc(100%_-_33px)]">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${data?.latitude},${data?.longitude}`}
          target="_blank"
          className="block"
        >
          <img
            src={`${import.meta.env.VITE_IMG_MAPBOX}${
              import.meta.env.VITE_MAPBOX
            }`}
            alt={data?.name}
            className="w-full h-full object-cover my-1 lg:max-h-[200px] max-h-[400px] rounded-[10px]"
          />
        </a>

        <div className="absolute right-4 left-4 bottom-4 flex items-center bg-white px-[10px] rounded-[10px] overflow-hidden justify-center py-[4px] lg:py-0">
          <FaDirections className="text-[36px] mr-3" />
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${data?.latitude},${data?.longitude}`}
            className="text-black text-base whitespace-nowrap overflow-hidden text-ellipsis hover:underline transition-all"
            target="_blank"
          >
            {data?.location}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ParticularLocation;
