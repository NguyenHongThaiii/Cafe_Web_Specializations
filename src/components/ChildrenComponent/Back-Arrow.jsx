import React, { useEffect, useRef } from "react";
import { handleInnerHeightSlides } from "../../utils";

function BackArrow() {
  const buttonRef = useRef(null);
  const height = screen.height / 2;
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY > height &&
        typeof document !== "undefined" &&
        buttonRef &&
        buttonRef.current
      ) {
        buttonRef.current.style.opacity =
          handleInnerHeightSlides(window.innerWidth) < 3 ? 0.6 : 1;
        buttonRef.current.style.visibility = "visible";
      } else if (
        window.scrollY < height &&
        typeof document !== "undefined" &&
        buttonRef &&
        buttonRef.current
      ) {
        buttonRef.current.style.opacity = 0;
        buttonRef.current.style.visibility = "hidden";
      }
    };
    if (buttonRef && buttonRef.current) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      onClick={handleScrollToTop}
      ref={buttonRef}
      className={` 
      animate-bounce lg:opacity-0 invisible z-50  fixed  z-1  cursor-pointer bg-primary  flex items-center justify-center text-white hover:bg-[#be0129] transition-all duration-300
      rounded-[6px]
      right-[20px] bottom-[120px]
      opacity-60
      w-[30px] h-[30px]
      lg:right-[40px] lg:bottom-[50px]
      lg:w-[40px] lg:h-[40px]
      lg:rounded-full
      `}
    >
      <svg
        className="text-2xl"
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="vertical-align-top"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"></path>
      </svg>
    </div>
  );
}

export default BackArrow;
