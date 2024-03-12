import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { MdMailOutline } from "react-icons/md";

InputControl.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  focus: PropTypes.bool,
};

function InputControl({ control, focus = false, ...props }) {
  const { field, fieldState } = useController({
    name: props.name,
    control,
    defaultValue: "",
  });
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef && inputRef.current && focus) {
      inputRef.current.focus();
    }
  }, [focus]);
  return (
    <div className="relative ">
      <MdMailOutline className="absolute top-0 right-[8px] text-[#c3c3c3] translate-y-[50%] text-[20px] " />
      <input
        className="w-full text-base tracking-[0.4px] outline-none rounded-[4px] border border-[#717171] py-[6px] pl-[10px] pr-[30px] focus:border-[#fc7f9c] focus:shadow-[0_0_6px_rgb(255,123,153)] transition-all duration-300"
        {...field}
        {...props}
        name={props?.name}
        ref={inputRef}
      />
    </div>
  );
}

export default InputControl;
