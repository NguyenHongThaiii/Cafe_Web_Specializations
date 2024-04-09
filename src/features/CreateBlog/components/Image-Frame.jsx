import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaCamera } from "react-icons/fa";

ImageFrame.propTypes = {
  onChange: PropTypes.func,
};

function ImageFrame({ onChange = null }) {
  const [files, setFiles] = useState([]);

  const handleOnChangeImage = (e) => {
    const files = Array.from(e.target.files).map((item, index) => {
      return URL.createObjectURL(e.target.files[index]);
    });
    const arrayFiles = Array.from(e.target.files).map((item, index) => {
      return e.target.files[index];
    });
    setFiles((prev) => [...prev, ...files]);
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
    setFiles((prev) => [...prev, ...files]);
    if (!onChange) return;
    onChange({ listMenuFile: arrayFiles });
  };
  return (
    <>
      <p className="text-[21px] font-medium text-primary pb-2  border-b-[1px]">
        Hình ảnh
      </p>
      <div>
        <div className="py-5 px-4 flex flex-col ">
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
          <span className="text-[12px] text-[#A1A1A1] ml-4">tối đa 10 ảnh</span>
        </div>
      </div>
      <p className="text-[21px] font-medium text-primary pb-2  border-b-[1px]">
        Menu
      </p>
      <div>
        <div className="py-5 px-4 flex flex-col ">
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
          <span className="text-[12px] text-[#A1A1A1] ml-4">tối đa 10 ảnh</span>
        </div>
      </div>
    </>
  );
}

export default ImageFrame;
