import PropTypes from "prop-types";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

SliderTemplate.propTypes = {
  state: PropTypes.array,
  slidesPerView: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.func,
  isHeading: PropTypes.bool,
  isLimitWidth: PropTypes.bool,
  isAutoplay: PropTypes.bool,
};

function SliderTemplate({
  state,
  slidesPerView = 3,
  title,
  isHeading = true,
  children,
  isLimitWidth = true,
  isAutoplay = true,
}) {
  return (
    <section className="">
      <div className={`${isLimitWidth ? "max-w-[1200px]" : ""} mx-auto px-4`}>
        {isHeading && (
          <h2
            className="text-left pl-[4px] border-l-4 border-primary font-bold text-[18px] text-text relative
          mt-[14px] mb-[10px] lg:my-10 lg:text-[28px] lg:text-center before:hidden before:lg:block lg:border-none
        before:absolute before:w-[90px] before:h-[2.5px] before:bg-primary before:mx-auto 
        before:top-auto  before:right-0 before:left-0 before:bottom-[-10px] before:rounded-[10px]
        "
          >
            {title}
          </h2>
        )}
        <Swiper
          pagination={true}
          rewind={true}
          navigation={true}
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={slidesPerView}
          spaceBetween={24}
          autoplay={isAutoplay}
          className={`mySwiper+${title}`}
        >
          {state.map((item, index) => (
            <SwiperSlide key={item.id}>
              {() => children(item, index)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default SliderTemplate;
