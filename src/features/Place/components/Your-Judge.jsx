import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { FaTimesCircle, FaCamera } from "react-icons/fa";
import { useSelector } from "react-redux";
import TextareaCustomControl from "../../../components/Form-Control/Textarea-Custom-Control";

YourJudge.propTypes = {
  items: PropTypes.object,
  onChange: PropTypes.func,
};

function YourJudge({ item = {}, onChange = null }) {
  const inputRef = useRef(null);
  const user = useSelector((state) => state.auth.current);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = `Đánh giá của ${user?.name} về ${item?.name}`;
    }
  }, [item]);

  const handleResetValue = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = "";
    }
  };
  const handleOnChangeFile = (e) => {
    const files = Array.from(e.target.files).map((item, index) => {
      return URL.createObjectURL(e.target.files[index]);
    });
    const arrayFiles = Array.from(e.target.files).map((item, index) => {
      return e.target.files[index];
    });
    setFiles((prev) => [...prev, ...files]);
    if (!onChange) return;
    onChange({ listImageFiles: arrayFiles });
  };
  return (
    <div>
      <h3 className="text-[18px] text-[#898c95] font-semibold mb-2">
        Đánh giá của bạn
      </h3>
      <div className="relative text-base rounded-[10px] mb-[10px]">
        <input
          type="text"
          ref={inputRef}
          className=" transition-all w-full border-[1px] rounded-[10px] outline-none border-[#d9d9d9] bg-white py-1 px-3 focus:shadow-[0_0_0_2px_rgb(238,0,51,0.2)] focus:border-[#fa284e]"
        />
        <div
          onClick={handleResetValue}
          className="absolute right-[10px] top-[10px] cursor-pointer text-[rgba(0,0,0,.25)] hover:text-[rgba(0,0,0,.45)] transition-all"
        >
          <FaTimesCircle />
        </div>

        <div>
          <TextareaCustomControl
            onChange={onChange}
            name="name"
            id="reviewUser"
            placeholder="Nhập tối thối 10 kí tự."
          />
        </div>

        <div className="mt-4 grid grid-cols-5 gap-3">
          {files.map((item, index) => (
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
          <div className="mb-2 mr-2 text-sm rounded-[10px] w-[104px] h-[104px] border flex items-center justify-center">
            <label
              htmlFor="file-img"
              className="flex flex-col items-center justify-center cursor-pointer gap-y-2"
            >
              <FaCamera className="text-[20px]" />
              <span>Thêm ảnh</span>
            </label>
            <input
              onChange={handleOnChangeFile}
              type="file"
              name="file-img"
              id="file-img"
              className="hidden"
              accept="image/*"
              multiple={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourJudge;
