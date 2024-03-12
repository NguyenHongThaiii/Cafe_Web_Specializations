import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-white relative hidden lg:block">
      <div className="absolute inset-0 z-[-1]">
        <img
          src="/img/background-footer.jpg"
          alt="background-footer"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[1200px] mx-auto pt-[30px] pb-[20px] px-[20px] relative border-b-2 border-white ">
        <div className="flex  item-center">
          <div className="w-[33.33%]">
            <div>
              <img
                src="/img/logo.svg"
                alt="logo-footer"
                className="h-[60px] object-cover cursor-pointer"
              />
            </div>
            <div className="w-[230px] mt-5 border-2 border-white rounded-md flex p-[6px] items-center justify-center hover:border-primary duration-300 cursor-pointer">
              <img
                src="/img/cooperate.webp"
                alt="logo-cooperate"
                className="h-[48px] w-[48px] object-cover mr-1"
              />
              <span className="text-[14px] text-white">
                Hợp tác với chúng tôi
              </span>
            </div>
          </div>

          <div className="w-[33.33%]">
            <h4 className="text-base font-bold uppercase mb-[14px]">
              Về chúng tôi
            </h4>
            <div className="mb-[6px] text-sm leading-6   ">
              <Link to="" className="animation-origin">
                Giới thiệu
              </Link>
            </div>
            <div className="mb-[6px] text-sm leading-6  ">
              <Link to="" className="animation-origin">
                Giải đáp thắc mắc
              </Link>
            </div>
            <div className="mb-[6px] text-sm leading-6  ">
              <Link to="" className="animation-origin">
                Liện hệ - góp ý
              </Link>
            </div>
            <div className="mb-[6px] text-sm leading-6  ">
              <Link to="" className="animation-origin">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>

          <div className="w-[33.33%]">
            <h4 className="text-base font-bold uppercase mb-[14px]">
              Theo dõi chúng tôi trên
            </h4>
            <div>
              <div className="mb-[6px] text-sm leading-6 animation-origin inline-block  ">
                <i className="fa-brands fa-facebook-f mb-[5px] mr-[5px] facebook text-[16px]"></i>
                <Link to="" className="">
                  Facebook
                </Link>
              </div>
            </div>
            <div>
              <div className="mb-[6px] text-sm leading-6 animation-origin inline-block  ">
                <i className="fa-brands fa-instagram mb-[5px] mr-[5px] instagram text-[16px]"></i>
                <Link to="" className="">
                  Instagram
                </Link>
              </div>
            </div>
            <div>
              <div className="mb-[6px] text-sm leading-6 animation-origin inline-block  ">
                <i className="fa-brands fa-tiktok mb-[5px] mr-[5px] tiktok text-[16px]"></i>
                <Link to="" className="">
                  Tiktok
                </Link>
              </div>
            </div>
          </div>
        </div>

        <img
          src="/img/sticker-footer.png"
          alt="sticker-footer"
          className="absolute w-[52px] h-[120px] top-0 right-4 bottom-auto left-auto   origin-top   transition all .1s cubic-bezier(.17,.67,.5,.71) hover:rotate-[-6deg]"
        />
      </div>

      <div className="text-center text-base py-[10px] px-4">
        Bản quyền © 2022
        <Link
          to=""
          className="uppercase text-primary font-bold cursor-pointer ml-1"
        >
          TOIDICAFE.VN
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
