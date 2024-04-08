import React from "react";
import PropTypes from "prop-types";
import {
  FaDollarSign,
  FaClock,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookSquare,
  FaTags,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatToVND, handleTransformStringToDate } from "../../../utils";

Details.propTypes = {
  item: PropTypes.object,
};

function Details({ item = {} }) {
  return (
    <div className="pt-1 px-[14px] pb-[10px] mb-[6px] shadow-[0_1px_4px_rgb(0,0,0,0.3)] rounded-[10px] flex-1">
      <h2 className="text-[21px] font-semibold">Thông tin chi tiết</h2>
      <div className="mt-2">
        <div className="flex items-center gap-x-[14px] mb-[6px]">
          <FaDollarSign />
          {formatToVND(item?.priceMin)} - {formatToVND(item?.priceMax)}
        </div>
        <div className="flex items-center gap-x-[14px] mb-[6px]">
          <FaClock />
          <div>
            <span
              className={`${
                item?.timeStart &&
                handleTransformStringToDate(
                  item?.schedules?.length > 0 && item?.schedules[0]?.startTime,
                  item?.schedules?.length > 0 && item?.schedules[0]?.endTime
                )
                  ? "text-secondary "
                  : "text-primary"
              } font-medium`}
            >
              {item?.timeStart &&
              handleTransformStringToDate(
                item?.schedules?.length > 0 && item?.schedules[0]?.startTime,
                item?.schedules?.length > 0 && item?.schedules[0]?.endTime
              )
                ? "Đang mở cửa"
                : "Đang đóng cửa"}
            </span>{" "}
            <span className="ml-1">
              {" "}
              <span className="pb-0.5 inline-block">
                {" "}
                {item?.schedules?.length > 0 && item?.schedules[0]?.startTime}
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-[14px] mb-[6px]">
          <FaPhoneAlt />

          {item?.phone}
        </div>
        <div className="flex items-center gap-x-[14px] mb-[6px]">
          <FaFacebookSquare />

          <a
            href={item?.facebook}
            className="text-[#0770cd] hover:underline transition-all duration-300"
          >
            {item?.name}
          </a>
        </div>
        {item?.kinds?.length > 0 && (
          <div className="flex items-center gap-x-[14px] mb-[6px]">
            <FaTags />

            <div className="w-full flex  items-center flex-wrap">
              {item?.kinds?.map((item, index) => (
                <Link
                  to={`/search?kind=${item?.slug}`}
                  key={index}
                  className="flex items-center whitespace-normal hover:underline transition-all duration-300 text-[#0770cd] before:content-['●'] before:inline-block before:text-[#c1c1c1] before:mx-[6px] before:text-[12px] first:before:hidden "
                >
                  <span className=" ">{item?.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
