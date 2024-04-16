import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaCamera } from "react-icons/fa";

ImageFrame.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.object,
  blog: PropTypes.object,
};

function ImageFrame({ onChange = null, error = {}, blog = {} }) {
  const [fileImages, setFileImages] = useState([]);
  const [fileMenus, setFileMenus] = useState([]);
  const handleOnChangeImage = (e) => {
    const files = Array.from(e.target.files).map((item, index) => {
      return URL.createObjectURL(e.target.files[index]);
    });
    const arrayFiles = Array.from(e.target.files).map((item, index) => {
      return e.target.files[index];
    });
    setFileImages((prev) => [...prev, ...files]);
    if (!onChange) return;
    onChange({ listImageFile: arrayFiles });
  };
  const handleOnChangeMenu = (e) => {
    const files = Array.from(e.target.files).map((item, index) => {
      return URL.createObjectURL(e.target.files[index]);
    });
    const arrayFiles = Array.from(e.target.files).map((item, index) => {
      return e.target.files[index];
    });
    setFileMenus((prev) => [...prev, ...files]);
    if (!onChange) return;
    onChange({ listMenuFile: arrayFiles });
  };
  return (
    <>
      <p className="text-[21px] font-medium text-primary pb-2  border-b-[1px]">
        Hình ảnh
      </p>

      <div className="mt-4 grid grid-cols-3 lg:grid-cols-7 gap-3">
        {fileImages.map((item, index) => (
          <div
            key={index}
            className="w-[104px] h-[104px]   opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer relative"
          >
            <div className="absolute inset-0  bg-[rgba(0,0,0,0.3) hover:bg-[rgba(0,0,0,0.5)] rounded-[10px] transition-all duration-300 z-10"></div>
            <img
              src={item}
              alt={item}
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
        ))}
        {fileImages?.length === 0 &&
          blog?.listImage?.map((item, index) => (
            <div
              key={index}
              className="w-[104px] h-[104px]   opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer relative"
            >
              <div className="absolute inset-0  bg-[rgba(0,0,0,0.3) hover:bg-[rgba(0,0,0,0.5)] rounded-[10px] transition-all duration-300 z-10"></div>
              <img
                src={item?.url}
                alt={item}
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
          ))}
        <div className="mb-2 mr-2 text-sm rounded-[10px] w-[104px] h-[104px] border flex items-center justify-center">
          <label
            htmlFor="listImageFile"
            className="flex flex-col items-center justify-center cursor-pointer gap-y-2"
          >
            <FaCamera className="text-[20px]" />
            <span>Thêm ảnh</span>
          </label>
          <input
            onChange={handleOnChangeImage}
            type="file"
            name="listImageFile"
            id="listImageFile"
            className="hidden"
            accept="image/*"
            multiple={true}
          />
        </div>
      </div>

      {error?.image && (
        <span className="block font-medium text-sm text-primary transition-all duration-150">
          {error.image}
        </span>
      )}
      <p className="text-[21px] font-medium text-primary pb-2  border-b-[1px] mt-5">
        Menu
      </p>
      <div className="mt-4 grid grid-cols-3 lg:grid-cols-7 gap-3">
        {fileMenus.map((item, index) => (
          <div
            key={index}
            className="w-[104px] h-[104px]  opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer relative"
          >
            <div className="absolute inset-0  bg-[rgba(0,0,0,0.3) hover:bg-[rgba(0,0,0,0.5)] rounded-[10px] transition-all duration-300 z-10"></div>
            <img
              src={item}
              alt={item}
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
        ))}
        {fileMenus?.length === 0 &&
          blog?.listMenu?.map((item, index) => (
            <div
              key={index}
              className="w-[104px] h-[104px]   opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer relative"
            >
              <div className="absolute inset-0  bg-[rgba(0,0,0,0.3) hover:bg-[rgba(0,0,0,0.5)] rounded-[10px] transition-all duration-300 z-10"></div>
              <img
                src={item?.url}
                alt={item}
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
          ))}
        <div className="mb-2 mr-2 text-sm rounded-[10px] w-[104px] h-[104px] border flex items-center justify-center">
          <label
            htmlFor="listMenuFile"
            className="flex flex-col items-center justify-center cursor-pointer gap-y-2"
          >
            <FaCamera className="text-[20px]" />
            <span>Thêm ảnh</span>
          </label>
          <input
            onChange={handleOnChangeMenu}
            type="file"
            name="listMenuFile"
            id="listMenuFile"
            className="hidden"
            accept="image/*"
            multiple={true}
          />
        </div>
      </div>

      {error?.menu && (
        <span className="block font-medium text-sm text-primary transition-all duration-150">
          {error.menu}
        </span>
      )}
    </>
  );
}

export default ImageFrame;
