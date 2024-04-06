import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaWifi,
  FaCreditCard,
  FaGuitar,
  FaShippingFast,
  FaBaby,
  FaBaseballBall,
  FaMotorcycle,
  FaCloudSun,
  FaPaw,
  FaHamburger,
  FaSmoking,
  FaCarAlt,
  FaBirthdayCake,
  FaWind,
} from "react-icons/fa";

import "./Place-Page.scss";
import { handleInnerHeightConvenient } from "../../../utils";
import { Link } from "react-router-dom";
ConvenientSlider.propTypes = {
  item: PropTypes.object,
};

const handleRenderSlider = (con) => {
  switch (con) {
    case "Bàn ngoài trời": {
      return (
        <FaCloudSun className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Bánh ngọt": {
      return (
        <FaBirthdayCake className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Chiếu bóng đá": {
      return (
        <FaBaseballBall className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Chỗ chơi cho trẻ em": {
      return (
        <FaBaby className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Chỗ đậu ôtô": {
      return (
        <FaCarAlt className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Giao hàng": {
      return (
        <FaShippingFast className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Giữ xe máy": {
      return (
        <FaMotorcycle className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Khu vực hút thuốc": {
      return (
        <FaSmoking className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Mang đồ ăn ngoài": {
      return (
        <FaHamburger className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Mang thú cưng": {
      return (
        <FaPaw className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Máy lạnh & điều hòa": {
      return (
        <FaWind className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Nhạc sống": {
      return (
        <FaGuitar className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Thanh toán bằng thẻ": {
      return (
        <FaCreditCard className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }
    case "Wi-fi miễn phí": {
      return (
        <FaWifi className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
    }

    default:
      return (
        <FaWifi className="text-primary lg:text-[24px] text-[20px] mb-[6px] font-bold " />
      );
  }
};

function ConvenientSlider({ item = {} }) {
  const [numberSlides, setNumberSlides] = useState(4);
  useEffect(() => {
    const handleResize = () => {
      const len = item.convenient ? item.convenient.length : numberSlides;
      setNumberSlides(handleInnerHeightConvenient(window.innerWidth, len));
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [item]);

  return (
    <div className="pt-1 px-[14px] pb-[10px] mb-[6px] shadow-[0_1px_4px_rgb(0,0,0,0.3)] rounded-[10px]">
      <Swiper
        pagination={true}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={numberSlides}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {item.conveniences &&
          item.conveniences.map((convenient, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/search?convenience=${convenient?.slug}`}
                className="block py-[16px] px-[6px] cursor-pointer flex flex-col gap-x-2 justify-center text-center items-center"
              >
                {handleRenderSlider(convenient?.name)}
                <span className="text-sm">{convenient?.name} </span>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default ConvenientSlider;
